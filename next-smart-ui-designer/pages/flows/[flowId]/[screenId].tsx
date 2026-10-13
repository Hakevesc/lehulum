import { GetServerSideProps } from 'next';
import { AppShell } from '@/components/AppShell';
import { ThemeToggle } from '@/components/ThemeToggle';
import { renderScreen } from '@/lib/screen-components';
import { getFlowById, getScreenById } from '@/lib/registry';
import { Icon } from '@/components/Icon';

export default function FlowScreenPage({ flowId, screenId }: { flowId: string; screenId: string }) {
  const flow = getFlowById(flowId);
  const screen = getScreenById(screenId);

  return (
    <AppShell
      title={flow.label}
      subtitle={`${flow.screens.length} screens · current: ${screen.title}`}
      actions={<ThemeToggle />}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
        <section className="card section-card">
          <div className="section-heading">
            <h2>Flow Steps</h2>
            <p>{flow.description}</p>
          </div>
          {flow.screens.map((id, index) => {
            const item = getScreenById(id);
            return (
              <a key={id} href={`/flows/${flow.id}/${id}`} className={`nav-link ${id === screen.id ? 'active' : ''}`}>
                <Icon name={item.icon} />
                <span style={{ flex: 1 }}>{index + 1}. {item.title}</span>
              </a>
            );
          })}
        </section>

        <div className="phone-preview-wrap">
          {renderScreen(screen.id)}
        </div>
      </div>
    </AppShell>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const flowId = String(context.params?.flowId ?? 'send-money');
  const screenId = String(context.params?.screenId ?? getFlowById(flowId).firstScreenId);

  return {
    props: { flowId, screenId }
  };
};
