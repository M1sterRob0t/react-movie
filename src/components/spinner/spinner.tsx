import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 120 }} spin />;
function Spinner(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      <Spin style={{ flexGrow: 1 }} indicator={antIcon} />
    </div>
  );
}

export default Spinner;
