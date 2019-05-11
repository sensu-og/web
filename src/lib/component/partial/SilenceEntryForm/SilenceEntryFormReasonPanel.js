import React from "/vendor/react";
import { useField, input } from "/vendor/@10xjs/form";

import { Typography, TextField } from "/vendor/@material-ui/core";

import Panel from "./SilenceEntryFormPanel";

const SilenceEntryFormReasonPanel = () => {
  const reason = useField("props.reason");

  return (
    <Panel
      title="Reason"
      summary={reason.value}
      hasDefaultValue={!reason.value}
    >
      <Typography color="textSecondary">
        Explanation for the creation of this entry.
      </Typography>

      <TextField
        label="Reason"
        multiline
        fullWidth
        rowsMax="4"
        margin="normal"
        {...input(reason)}
      />
    </Panel>
  );
};

export default SilenceEntryFormReasonPanel;
