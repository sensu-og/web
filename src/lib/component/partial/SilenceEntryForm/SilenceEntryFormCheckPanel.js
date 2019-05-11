/* eslint-disable react/prop-types */

import React from "/vendor/react";
import {
  useField,
  input,
  useStatus,
  useFieldStatus,
} from "/vendor/@10xjs/form";
import { withStyles, Typography, TextField } from "/vendor/@material-ui/core";

import ResetAdornment from "/lib/component/partial/ResetAdornment";

import Panel from "./SilenceEntryFormPanel";

const MonoTextField = withStyles(theme => ({
  root: { "& input": { fontFamily: theme.typography.monospace.fontFamily } },
}))(TextField);

const SilenceEntryFormCheckPanel = ({ formatError }) => {
  const check = useField("check");
  const subscription = useFieldStatus("subscription");
  const { submitFailed } = useStatus();

  const error =
    check.touched || subscription.touched || submitFailed
      ? formatError(check.error)
      : "";

  return (
    <Panel
      title="Check"
      summary={check.value || "all checks"}
      hasDefaultValue={!check.value}
      error={error}
    >
      <Typography color="textSecondary">
        Enter the name of a check the silencing entry should match.
      </Typography>

      <MonoTextField
        label="Check"
        fullWidth
        margin="normal"
        error={!!error}
        InputProps={{
          endAdornment: check.initialValue && check.dirty && (
            <ResetAdornment
              onClick={() => check.setValue(check.initialValue)}
            />
          ),
        }}
        {...input(check)}
      />
    </Panel>
  );
};

export default SilenceEntryFormCheckPanel;
