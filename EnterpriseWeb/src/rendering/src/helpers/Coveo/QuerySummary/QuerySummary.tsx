import { QuerySummary as HeadlessQuerySummary } from '@coveo/headless';
import { useTheme } from 'lib/context/ThemeContext';
import { useEffect, useState, FunctionComponent } from 'react';

interface QuerySummaryProps {
  controller: HeadlessQuerySummary;
  querySummaryClasses?: string;
}

export const QuerySummary: FunctionComponent<QuerySummaryProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), []);
  const { themeName } = useTheme();

  const { hasResults, hasQuery, firstResult, lastResult, total, query } = state;

  if (!hasResults) {
    return null;
  }

  const summary = [
    `${themeName === 'aw' ? 'Results' : ''} ${firstResult}-${lastResult} of ${total}`,
  ];

  if (hasQuery) {
    summary.push(`for ${query}`);
  }
  return <p className={props.querySummaryClasses}>{summary.join(' ')}</p>;
};
