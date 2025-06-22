import WorkspaceSelector from "./WorkspaceSelector";
import "./Home.css";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Workspace } from "../../modules/workspaces/workspace.entity";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import type { Channel } from "../../modules/channels/channel.entity";
import { channelRepository } from "../../modules/channels/channel.repository";

function Home() {
  const { currentUser } = useCurrentUserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const params = useParams();
  const { workspaceId, channelId } = params;
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id === workspaceId
  );
  const selectedChannel = channels.find((channel) => channel.id === channelId);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    fetchChannels(workspaceId!);
  }, [workspaceId]);

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await workspaceRepository.find();
      setWorkspaces(workspaces);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const fetchChannels = async (workspaceId: string) => {
    try {
      const channels = await channelRepository.find(workspaceId);
      setChannels(channels);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  if (!currentUser) return <Navigate to="/signin" />;

  return (
    <div className="slack-container">
      <WorkspaceSelector
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
        selectedWorkspaceId={workspaceId!}
      />
      {selectedWorkspace != null ? (
        <>
          <Sidebar
            selectedWorkspace={selectedWorkspace}
            selectedChannelId={channelId!}
            channels={channels}
          />

          <MainContent selectedChannel={selectedChannel} />
        </>
      ) : (
        <div className="sidebar" />
      )}
    </div>
  );
}

export default Home;
