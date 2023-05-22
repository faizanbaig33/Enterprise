import { ComponentProps } from 'lib/component-props';

export type SystemErrorProps = ComponentProps & {
  fields: {
    title: string;
    message: string;
  };
};

const SystemError = ({ fields }: SystemErrorProps): JSX.Element => {
  const styles = {
    background: '#C70039',
    outline: '5px solid red',
    padding: 10 + 'px',
    color: 'white',
    maxWidth: '500px',
  };

  return (
    <div style={styles}>
      <h2>{fields?.title}</h2>
      <p>{fields?.message}</p>
    </div>
  );
};

export default SystemError;
