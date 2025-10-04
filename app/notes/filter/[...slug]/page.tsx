import NotesClient from './Notes.client';
import SidebarNotes from '../@sidebar/SidebarNotes';
import css from './NotesPage.module.css';

export default async function NotesPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params; 
  const tag = resolvedParams.slug?.[0] || 'All';

  return (
    <div className={css.pageContainer}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <main className={css.mainContent}>
        <NotesClient tag={tag} />
      </main>
    </div>
  );
}
