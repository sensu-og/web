import React from "/vendor/react";
import {
  useField,
  useStatus,
  useFieldStatus,
  input,
} from "/vendor/@10xjs/form";

import { withStyles, Typography, TextField } from "/vendor/@material-ui/core";

import { Code } from "/lib/component/base";
import ResetAdornment from "/lib/component/partial/ResetAdornment";

import Panel from "./SilenceEntryFormPanel";

const MonoTextField = withStyles(theme => ({
  root: { "& input": { fontFamily: theme.typography.monospace.fontFamily } },
}))(TextField);

const SilenceEntryFormSubscriptionPanel = ({ formatError }) => {
  const subscription = useField("subscription");
  const check = useFieldStatus("check");
  const { submitFailed } = useStatus();

  const error =
    check.touched || subscription.touched || submitFailed
      ? formatError(subscription.error)
      : "";

  return (
    <Panel
      title="Subscription"
      summary={subscription.value || "all entities"}
      hasDefaultValue={!subscription}
      error={error}
    >
      <Typography color="textSecondary">
        Enter the name of the subscription the entry should match. Use the
        format <Code>entity:$ENTITY_NAME</Code> to match a specific entity.
      </Typography>

      <MonoTextField
        label="Subscription"
        fullWidth
        margin="normal"
        error={!!error}
        InputProps={{
          endAdornment: subscription.initialValue && subscription.dirty && (
            <ResetAdornment
              onClick={() => subscription.setValue(subscription.initialValue)}
            />
          ),
        }}
        {...input(subscription)}
      />
    </Panel>
  );
};

export default SilenceEntryFormSubscriptionPanel;
