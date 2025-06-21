import "../Signup/auth.css";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate } from "react-router-dom";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();
  if (!currentUser) return <Navigate to="/signin" />;

  const createWorkspace = async (name: string) => {
    try {
      const newWorkspace = await workspaceRepository.create(name);
      console.log("New workspace created:", newWorkspace);
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };
  return (
    <div>
      <CreateWorkspaceModal onSubmit={createWorkspace} />
    </div>
  );
}

export default CreateWorkspace;
