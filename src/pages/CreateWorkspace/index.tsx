import "../Signup/auth.css";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate } from "react-router-dom";
function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();
  if (!currentUser) return <Navigate to="/signin" />;
  return (
    <div>
      <CreateWorkspaceModal />
    </div>
  );
}

export default CreateWorkspace;
