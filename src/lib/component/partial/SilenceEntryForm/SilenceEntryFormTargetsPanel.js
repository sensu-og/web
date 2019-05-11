/* eslint-disable react/prop-types */

import React from "/vendor/react";
import { useField } from "/vendor/@10xjs/form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "/vendor/@material-ui/core/";

import Panel from "./SilenceEntryFormPanel";

const SilenceEntryFormTargetsPanel = ({ formatError }) => {
  const field = useField("targets");

  return (
    <Panel
      title="Targets"
      summary={`${field.value.length} targets selected`}
      hasDefaultValue={false}
      error={field.error && "Encountered errors creating silencing entries."}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Check</TableCell>
            <TableCell>Subscription</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {field.value.map((target, i) => (
            <TableRow key={`${target.subscription}:${target.check}`}>
              <TableCell>
                {target.check || "*"}
                {field.error && field.error[i] && field.error[i].check && (
                  <div>
                    <Typography color="error">
                      {formatError(field.error[i].check)}
                    </Typography>
                  </div>
                )}
              </TableCell>
              <TableCell>{target.subscription || "*"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Panel>
  );
};

export default SilenceEntryFormTargetsPanel;
