import React from "/vendor/react";
import { useField } from "/vendor/@10xjs/form";

import {
  UNIQUE_CONSTRAINT,
  REQUIRED,
  formatValidationError,
} from "/lib/util/validation";

import TargetsPanel from "./SilenceEntryFormTargetsPanel";
import CheckPanel from "./SilenceEntryFormCheckPanel";
import SubscriptionPanel from "./SilenceEntryFormSubscriptionPanel";
import ExpirationPanel from "./SilenceEntryFormExpirationPanel";
import SchedulePanel from "./SilenceEntryFormSchedulePanel";
import ReasonPanel from "./SilenceEntryFormReasonPanel";

const formatCheckSubscriptionError = error => {
  if (!error) {
    return "";
  }

  return (
    {
      [REQUIRED]: "Either check or subscription is required.",
      [UNIQUE_CONSTRAINT]: "Cannot create duplicate silencing entry.",
    }[error.code] || formatValidationError(error)
  );
};

const Targets = () => {
  const targets = useField("targets");

  return Array.isArray(targets.value) ? (
    <TargetsPanel formatError={formatCheckSubscriptionError} />
  ) : (
    <React.Fragment>
      <CheckPanel formatError={formatCheckSubscriptionError} />
      <SubscriptionPanel formatError={formatCheckSubscriptionError} />
    </React.Fragment>
  );
};

class SilenceEntryFormFields extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Targets />
        <SchedulePanel />
        <ExpirationPanel />
        <ReasonPanel />
      </React.Fragment>
    );
  }
}

export default SilenceEntryFormFields;
