import { FormControlLabel, Switch } from "@mui/material";
import CodeBlock from "@theme/CodeBlock";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const JSONBlock = ({ object, multiline }) => {
	// Prop definitions.
	// object: The object to display.
	// multiline: Whether to display the object as a single line or multiline.

	// Set up state.
	const [isMultiline, setMultiline] = useState(multiline);

	// Run custom logic.
	const text = isMultiline
		? JSON.stringify(object, null, 2)
		: JSON.stringify(object);

	// Return the component.
	return (
		<div className="json-preview">
			<ReactMarkdown>{"## JSON"}</ReactMarkdown>

			<CodeBlock text={text} language="json" showLineNumber>
				{text}
			</CodeBlock>
			<FormControlLabel
				labelPlacement="start"
				label="Multiline"
				control={
					<Switch
						checked={isMultiline}
						onChange={() => setMultiline(!isMultiline)}
						inputProps={{ "aria-label": "Toggle multiline state." }}
					/>
				}
			/>
		</div>
	);
};

// Default props.
JSONBlock.defaultProps = {
	object: {},
	multiline: true,
};

// Export the component.
export default JSONBlock;
