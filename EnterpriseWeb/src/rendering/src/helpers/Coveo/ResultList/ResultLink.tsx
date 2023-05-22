import { buildInteractiveResult, Result } from '@coveo/headless';
import { FunctionComponent, useEffect } from 'react';
import { coveoEngineInstances } from '../../../lib/context/CoveoEngine';
import { filterProtocol } from '../../../lib/utils/filter-protocol';
import { SitecoreIds } from 'lib/constants';

interface InteractiveResultProps {
  result: Result;
}

export const ResultLink: FunctionComponent<InteractiveResultProps> = (props) => {
  const controller = buildInteractiveResult(coveoEngineInstances.searchPageEngine.headlessEngine, {
    options: { result: props.result },
  });

  useEffect(() => () => controller.cancelPendingSelect());

  const isDocumentLink =
    props.result.raw['sc_templateid'] ===
    SitecoreIds.Feature.Data.Documents.TechnicalDocument.TemplateId.replace(/-/g, '');

  return isDocumentLink ? (
    <a
      href={filterProtocol(props.result.clickUri)}
      className={isDocumentLink && 'documentLink'}
      title={props.result.raw['ew_document_title'] as string}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  ) : (
    <a
      href={filterProtocol(props.result.clickUri)}
      onClick={() => controller.select()}
      onContextMenu={() => controller.select()}
      onMouseDown={() => !isDocumentLink && controller.select()}
      onMouseUp={() => controller.select()}
      onTouchStart={() => controller.beginDelayedSelect()}
      onTouchEnd={() => controller.cancelPendingSelect()}
    >
      {props.children}
    </a>
  );
};
