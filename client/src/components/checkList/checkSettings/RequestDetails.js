import React from 'react'
import { useSelector } from 'react-redux'
import { find, isEmpty } from 'lodash'
import AceEditor from 'react-ace'
import { Alert } from 'react-bootstrap'
import 'brace/theme/github';
import 'brace/mode/json';

export default ({ checkId }) => {
	const 
		checks = useSelector(state => state.checks.checks ? state.checks.checks : {}),
		editableCheck = find(checks, { _id: checkId }),
		reqDet = !isEmpty(editableCheck.request) ? JSON.stringify(editableCheck.request, null, 2) : {}

	return (
		<>
		{!isEmpty(reqDet) ? <AceEditor 
			mode="json"
			theme="github"
			value={reqDet}
			fontSize={18}
			width="700px"
			readOnly
		/> : <Alert variant="dark">No data yet, check back later</Alert>}
		</>
	)
}