/**
 * View tab of the doc page
 * Created at 2021/09/14
 * Created by Ilia L
 */

import React from 'react';
import parse from 'html-react-parser';

function ViewTab() {
	return <>{parse("<h1>The text using 'html-react-parser' module</h1>")}</>;
}

export default ViewTab;
