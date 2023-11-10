import { Checkbox } from "@navikt/ds-react"
import React, { useState } from "react"
import { useSafeTabChange } from "../../api/safe-tab-change-context"

interface IPermissionTableCheckbox {
	indexForOperationsList: number
	isCheckedProp: boolean
	featureId: number
	operationProp: string
	notifyOperationsChanged: (indexForOperationsList: number, featureId: number, operationProp: string) => void
}
const PermissionsTableCheckbox = ({
	indexForOperationsList,
	isCheckedProp,
	featureId,
	operationProp,
	notifyOperationsChanged
}: IPermissionTableCheckbox) => {
	const [isChecked, setIsChecked] = useState(isCheckedProp)
	const { isTabModified, setIsTabModified } = useSafeTabChange()
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
		if (!isTabModified) {
			setIsTabModified(true)
		}
		notifyOperationsChanged(indexForOperationsList, featureId, operationProp)
	}

	return (
		<Checkbox hideLabel={true} checked={isChecked} color={"primary"} onChange={handleCheckboxChange}>
			{operationProp}
		</Checkbox>
	)
}

export default PermissionsTableCheckbox
