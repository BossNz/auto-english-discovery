import axios from "axios";
export default class engdis {
  constructor(
    baseURL = "https://edservices.engdis.com/api/",
    authorization = ""
  ) {
    axios.defaults.baseURL = baseURL;
    if (authorization)
      axios.defaults.headers.authorization = "Bearer " + authorization;
  }
  // 5232957 for KMITL.
  async Login(username, password, InstitutionId = "5232957") {
    try {
      var { data } = await axios.post("Auth", {
        CommunityVersion: "100",
        InstitutionId,
        Password: password,
        UserName: username,
      });
      return data;
    } catch (e) {
      return {
        isSuccess: false,
      };
    }
  }
  async Logout() {
    try {
      var { data } = await axios.get("Auth/Logout");
      return data;
    } catch (e) {
      return {
        isSuccess: false,
      };
    }
  }
  async getGetDefaultCourseProgress() {
    try {
      var { data } = await axios.get("CourseTree/GetDefaultCourseProgress");
      return {
        isSuccess: true,
        data: data.CourseProgressTree.Children,
      };
    } catch (err) {
      return {
        isSuccess: false,
        data: err.response.data,
      };
    }
  }
  async getCourseTree(NodeId, ParentNodeId, NodeType = 2) {
    try {
      var { data } = await axios.post(
        "CourseTree/GetUserNodeProgress/" + ParentNodeId,
        [
          {
            ParticleId: NodeId,
            NodeType,
            LockedNodes: null,
            particleHasProgress: true,
            lowestNodeType: 5,
          },
        ]
      );
      return {
        isSuccess: true,
        data: data[0].Children,
      };
    } catch (err) {
      return {
        isSuccess: false,
        data: err.response.data,
      };
    }
  }
  async practiceGetItem(NodeId, code, number = 1) {
    try {
      var { data } = await axios.get(
        `/practiceManager/GetItem/${NodeId}/${code}t${String(number).padStart(
          2,
          "0"
        )}/25/0/6/`
      );
      return { isSuccess: true, data };
    } catch (e) {
      console.log(e.response.data);
      return { isSuccess: false };
    }
  }

  async SaveUserTestV1(nodeId, ParentNodeId, body) {
    try {
      var { data } = await axios.post(
        `/UserTestV1/SaveUserTest/${nodeId}/${ParentNodeId}/true`,
        {
          t: 32000,
          a: body,
        }
      );
      return { isSuccess: true, data };
    } catch (e) {
      console.log(e.response.data);
      return { isSuccess: false };
    }
  }

  async setSucessTask(CourseId, ItemId) {
    try {
      var { data } = await axios.post("Progress/SetProgressPerTask", {
        CourseId,
        ItemId,
      });
      return {
        isSuccess: true,
        data: data,
      };
    } catch (err) {
      return {
        isSuccess: false,
      };
    }
  }
}
