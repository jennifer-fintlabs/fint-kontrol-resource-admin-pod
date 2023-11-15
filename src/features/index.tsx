import React from "react"
import { PersonCheckmarkIcon, PersonPlusIcon } from "@navikt/aksel-icons"
import { Loader, Tabs } from "@navikt/ds-react"

import AssignRolesMain from "./assign-roles-tab/assign-roles-main"
import { PermissionsMain } from "./define-role-tab/permissions-main"
import { UsersRolesMain } from "./users-roles-tab"
import styled from "styled-components"
import { useSafeTabChange } from "../api/safe-tab-change-context"
import { useNavigate } from "react-router-dom"
import { useGeneral } from "../api/GeneralContext"

export const LoaderStyled = styled(Loader)`
	display: flex;
	margin: auto;
`

const LandingComponent = () => {
	const { basePath } = useGeneral()
	const { currentTab, isTabModified, setCurrentTab, setIsModalVisible, setTabToRouteTo } = useSafeTabChange()

	const navigate = useNavigate()

	const handleChangeTab = (tabClicked: string) => {
		if (isTabModified) {
			setIsModalVisible(true)
			setTabToRouteTo(tabClicked)
			navigate(`${basePath === "/" ? "/" : basePath + "/"}ressurser-admin?tab=${tabClicked}`)
		} else {
			setCurrentTab(tabClicked)
			navigate(`${basePath === "/" ? "/" : basePath + "/"}ressurser-admin?tab=${tabClicked}`)
		}
	}

	return (
		<div>
			<h2 id="tableTitle">Rettighetsstyring</h2>

			<Tabs value={currentTab} id={"navigation-bar-id"} onChange={handleChangeTab}>
				<Tabs.List>
					<Tabs.Tab
						value="tildel"
						label="Tildel rettigheter"
						icon={<PersonPlusIcon title="historielogg" />}
						id={"assign-role-tab-id"}
					/>
					<Tabs.Tab
						value="define"
						label="Definer rolle"
						icon={<PersonCheckmarkIcon title="inbox" />}
						id={"define-role-tab-id"}
					/>
					<Tabs.Tab
						value="usersWithRoles"
						label="Se brukere med roller"
						icon={<PersonCheckmarkIcon title="inbox" />}
						id={"see-users-tab-id"}
					/>
				</Tabs.List>

				<Tabs.Panel value="tildel" className="h-24 w-full bg-gray-50 p-4">
					<AssignRolesMain />
				</Tabs.Panel>

				<Tabs.Panel value="define" className="h-24 w-full bg-gray-50 p-4">
					<PermissionsMain />
				</Tabs.Panel>

				<Tabs.Panel value="usersWithRoles" className="h-24 w-full bg-gray-50 p-4">
					<UsersRolesMain />
				</Tabs.Panel>
			</Tabs>
		</div>
	)
}

export default LandingComponent
