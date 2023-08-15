import { Alert, Space } from 'antd';
interface IPopupProps {
  name?: string;
  message?: string;
  type?: 'error' | 'warning' | 'success' | 'info' | undefined;
  offline?: boolean;
}

function Popup({ name = 'Error', message = '', type = 'error', offline = false }: IPopupProps): JSX.Element {
  if (offline) {
    type = 'warning';
    name = 'Offline';
    message = 'Your internet connection was lost :(';
  }

  return (
    <Space direction="vertical" style={{ width: 500, height: 200, margin: '35vh auto' }}>
      <Alert type={type} showIcon message={name} description={message} style={{ transform: 'scale(1.4)' }} />
    </Space>
  );
}

export default Popup;
