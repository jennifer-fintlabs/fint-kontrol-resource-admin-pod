import { Button, Modal, Select, Switch } from "@navikt/ds-react"
import React, { useEffect, useRef, useState } from "react"
import { IRole, IUser } from "../../../../api/types"
import styled from "styled-components"
import { useAssignments } from "../../../../api/AssignmentContext"

const ModalBodyStyled = styled(Modal.Body)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

interface DeleteAssignmentsModalProps {
	selectedRoleToDeleteFrom: IRole
	modalOpenProp: boolean
	setIsDeleteModalOpen: (isOpen: boolean) => void
	userData: IUser
}

const DeleteAssignment = ({
	setIsDeleteModalOpen,
	modalOpenProp,
	selectedRoleToDeleteFrom,
	userData // TODO: userData will be updated in API, this requires refactoring when done.
}: DeleteAssignmentsModalProps) => {
	const deleteRef = useRef<HTMLDialogElement>(null)
	const [completeDelete, setCompleteDelete] = useState(false)
	const [objectTypesInUser, setObjectTypesInUser] = useState<string[]>([])

	const [objectTypeToDelete, setObjectTypeToDelete] = useState("")

	const { deleteAssignmentById, userDetailsPage } = useAssignments()

	useEffect(() => {
		// TODO: This must be refactored when an API endpoint is avaialble to retrieve objectTypesInUserOrgUnits. This is to reduce frontend load scalability.
		const objectTypesInUserOrgUnits = userDetailsPage?.accessRoles.flatMap((role) =>
			role.orgUnits.map((orgUnit) => orgUnit.objectType)
		)

		if (objectTypesInUserOrgUnits) {
			setObjectTypeToDelete(objectTypesInUserOrgUnits[0])
			setObjectTypesInUser(objectTypesInUserOrgUnits)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData])

	useEffect(() => {
		if (selectedRoleToDeleteFrom.accessRoleId.length > 0 || modalOpenProp) {
			openModal()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRoleToDeleteFrom, modalOpenProp])

	useEffect(() => {
		if (completeDelete) {
			setObjectTypeToDelete("")
		}
	}, [completeDelete])

	const openModal = () => {
		setIsDeleteModalOpen(true)
		deleteRef.current?.showModal()
	}

	const closeModal = () => {
		setIsDeleteModalOpen(false)
		deleteRef.current?.close()
	}

	const handleDeleteAssignmentData = () => {
		deleteAssignmentById(userData.resourceId, selectedRoleToDeleteFrom.accessRoleId, objectTypeToDelete)
		closeModal()
	}

	// Use Set to get unique values
	const uniqueObjectTypes = Array.from(new Set(objectTypesInUser))

	return (
		<Modal ref={deleteRef} header={{ heading: `Slett ${selectedRoleToDeleteFrom.name}?` }} onClose={closeModal}>
			<ModalBodyStyled>
				Ønsker du å slette brukertilknytningen til {selectedRoleToDeleteFrom.name} og de underliggende
				orgenhetene?
				<Switch onClick={() => setCompleteDelete(!completeDelete)} checked={completeDelete}>
					Fjern hele knytningen uavhengig objekttyper?{" "}
				</Switch>
				{!completeDelete && (
					<Select
						label={"Velg objekttype å inkludere i sletting"}
						onChange={(e) => setObjectTypeToDelete(e.target.value)}
					>
						{uniqueObjectTypes.map((objectType, index) => (
							<option key={index}>{objectType}</option>
						))}
					</Select>
				)}
			</ModalBodyStyled>
			<Modal.Footer>
				<Button type="button" variant={"danger"} onClick={() => handleDeleteAssignmentData()}>
					Slett
				</Button>
				<Button type="button" variant="secondary" onClick={closeModal}>
					Avbryt
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteAssignment
