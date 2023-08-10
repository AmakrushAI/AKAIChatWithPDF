import type { NextPage } from 'next';
import Head from 'next/head';
import { useLocalization } from '../hooks/useLocalization';
import dynamic from 'next/dynamic';
import LeftSide from '../components/LeftSide';
import MiddleSide from '../components/MiddleSide';
import { AppContext } from '../context';
import { useContext } from 'react';
import { Spinner } from '@chakra-ui/react';

const ChatUiWindow = dynamic(
  () => import('../components/ChatWindow/ChatUiWindow'),
  { ssr: false }
);

const Home: NextPage = () => {
  const t = useLocalization();
  const context = useContext(AppContext);
  const { collapsed, sttReq } = context;

  return (
    <>
      <Head>
        <title> {t('label.title')}</title>
      </Head>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
        }}>
        <div
          style={{
            backgroundColor: '#001529',
            flex: collapsed ? '0.05' : '0.2',
            color: 'white',
            padding: '1vh',
            transition: 'all 0.2s ease',
          }}>
          <LeftSide />
        </div>
        <div
          style={{
            backgroundColor: '#0B1F3A',
            flex: 1,
          }}>
          <MiddleSide />
        </div>
        <div
          style={{
            flex: 1,
            height: window.innerWidth < 768 ? '85vh' : '90vh',
          }}
        >
          <ChatUiWindow />
          {sttReq && (
            <div
              style={{
                height: '100vh',
                width: '100vw',
                zIndex: 1000,
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner />
            </div>
          )}
          
        </div>
        
      </div>

      {/* Mobile View */}
      <style jsx>{`
        @media (max-width: 767px) {
          div {
            display: none;
          }
          div:last-child {
            display: block;
          }
        }
      `}</style>
    </>
  );
};
export default Home;
