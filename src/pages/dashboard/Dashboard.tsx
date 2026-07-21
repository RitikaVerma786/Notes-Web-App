import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotesContext } from "../../contexts/NotesContext";
import { getNotesReq, getFavNotes } from "../../apis/notesApi";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { loggedInUser } = useAuth();
  const { notes, setNotes, favNotesIds, setfavNotesIds, openFormPageModal, openProfileModal, setLoader } = useNotesContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoader(true);
        // Fetch notes if we don't have them yet or want to ensure they are fresh
        const notesRes = await getNotesReq();
        if (notesRes?.data) setNotes(notesRes.data);

        // Fetch favorites
        const favRes = await getFavNotes();
        if (favRes?.data?.favNotesIds) setfavNotesIds(favRes.data.favNotesIds);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoader(false);
      }
    };
    fetchDashboardData();
  }, [setNotes, setfavNotesIds, setLoader]);

  // Get the 3 most recently updated/created notes. 
  // Assuming the notes array from backend is chronological or we just take the last 3.
  const recentNotes = [...notes].reverse().slice(0, 3);

  return (
    <div className={styles.dashboardContainer}>
      
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <h1>Welcome back, {loggedInUser?.firstName || 'User'}! 👋</h1>
        <p>Here's a quick overview of your thoughts and notes today.</p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.purple}`}>📝</div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{notes.length}</span>
            <span className={styles.statLabel}>Total Notes</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.pink}`}>⭐</div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{favNotesIds.length}</span>
            <span className={styles.statLabel}>Favorites</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.blue}`}>⚡</div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{recentNotes.length}</span>
            <span className={styles.statLabel}>Recent Edits</span>
          </div>
        </div>
      </div>

      <div className={styles.actionsAndRecent}>
        {/* Quick Actions */}
        <div>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionGrid}>
            <button className={styles.actionButton} onClick={openFormPageModal}>
              <div className={styles.actionIcon}>➕</div>
              Create New Note
            </button>
            <button className={styles.actionButton} onClick={() => navigate('/notes')}>
              <div className={styles.actionIcon}>📁</div>
              Browse All Notes
            </button>
            <button className={styles.actionButton} onClick={openProfileModal}>
              <div className={styles.actionIcon}>👤</div>
              Manage Profile
            </button>
          </div>
        </div>

        {/* Recent Notes Preview */}
        <div>
          <h2 className={styles.sectionTitle}>Recent Notes</h2>
          {recentNotes.length > 0 ? (
            <div className={styles.recentGrid}>
              {recentNotes.map((note) => (
                <div key={note._id} className={styles.recentNoteCard}>
                  <h3 className={styles.noteTitle}>{note.title}</h3>
                  <p className={styles.noteContent}>{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>You don't have any notes yet.</p>
              <p>Click "Create New Note" to get started!</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
