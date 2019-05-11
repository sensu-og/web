/* eslint-disable react/prop-types */

import React from "/vendor/react";
import {
  Collapse,
  FormControl,
  FormControlLabel,
  TextField,
  Switch,
  InputAdornment,
  Typography,
} from "/vendor/@material-ui/core";

import { useField, checkbox, input } from "/vendor/@10xjs/form";

import Panel from "./SilenceEntryFormPanel";

const DEFAULT_EXPIRE_DURATION = 3600;

const SilenceEntryFormExpirationPanel = () => {
  const expire = useField("expire");
  const expireOnResolve = useField("expireOnResolve");

  const expireAfterDuration = expire.value > 0;

  const lastExpireValue = React.useRef();

  if (expireAfterDuration) {
    lastExpireValue.current = expire.value;
  }

  const hasDefaultValue = !expireOnResolve.value && !expireAfterDuration;

  const summary =
    [
      expireOnResolve.value ? "on resolved check" : null,
      expireAfterDuration
        ? `after ${expire.value} ${expire.value === 1 ? "second" : "seconds"}`
        : null,
    ]
      .filter(Boolean)
      .join(", or ") || "when manually removed";

  return (
    <Panel
      title="Expiration"
      summary={summary}
      hasDefaultValue={hasDefaultValue}
    >
      <Typography color="textSecondary">
        This silencing entry will be automatically removed when any of the
        expiration conditions are met.
      </Typography>
      <FormControl fullWidth>
        <FormControlLabel
          control={<Switch {...checkbox(expireOnResolve)} />}
          label="Expire when a matching check resolves"
        />
      </FormControl>
      <FormControl fullWidth>
        <FormControlLabel
          control={
            <Switch
              checked={expireAfterDuration}
              onChange={event => {
                const checked = event.target.checked;
                expire.setValue(
                  checked
                    ? lastExpireValue.current || DEFAULT_EXPIRE_DURATION
                    : -1,
                );
              }}
            />
          }
          label="Expire after a fixed duration"
        />
      </FormControl>
      <Collapse in={expireAfterDuration || expire.focused}>
        <FormControl fullWidth>
          <TextField
            type="number"
            label="Expire after"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">seconds</InputAdornment>
              ),
            }}
            {...input(expire, {
              format(value) {
                return value === undefined || value === null || value === -1
                  ? ""
                  : `${value}`;
              },
              parse(event) {
                const parsed = parseInt(event.target.value, 10);
                const value = Number.isNaN(parsed) ? -1 : parsed;

                if (value > 0) {
                  lastExpireValue.current = value;
                }

                return value;
              },
            })}
          />
        </FormControl>
      </Collapse>
    </Panel>
  );
};

export default SilenceEntryFormExpirationPanel;
