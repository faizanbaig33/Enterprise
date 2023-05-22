import { EditFrame, DefaultEditFrameButton } from 'src/helpers/EditFrame';
import { ComponentProps } from 'lib/component-props';

export type EmptySharedChildDataSourceProps = ComponentProps & {
  fields: {
    id: string;
    title: string;
    message: string;
  };
};

const EmptySharedChildDataSource = ({ fields }: EmptySharedChildDataSourceProps): JSX.Element => {
  const styles = {
    background: '#cccc00',
    outline: '5px solid yellow',
    padding: 10 + 'px',
    color: 'white',
    maxWidth: '500px',
  };

  return (
    <EditFrame
      title="Empty Child Data Source"
      dataSource={{ itemId: fields.id }}
      buttons={[{ ...DefaultEditFrameButton.edit, fields: ['dataSource'] }]}
    >
      <div style={styles}>
        <h2>{fields.title}</h2>
        <p>{fields.message}</p>
      </div>
    </EditFrame>
  );
};

export default EmptySharedChildDataSource;
