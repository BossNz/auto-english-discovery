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
      var { data } = await axios.post("Auth/ForceLogin", {
        CommunityVersion: "109",
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

  async practiceGetItem(code) {
    try {
      var { data } = await axios.get(
        `/practiceManager/GetItem/0/${code}/23/0/7/`
      );
      return { isSuccess: true, data };
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async getTestCodeDigit(code) {
    try {
      var { data } = await axios.get(`https://ed20.engdis.com//Runtime/Lessons/${code}.js`)
      data = data.split("var lesson = ")[1]
      data = data.split(";")[0]
      data = JSON.parse(data)
      data = data["steps"].filter(item => item.id == '3')
      return data[0]
    } catch (err) {
      console.log(err)
      return {
        isSuccess: false
      }
    }
  }

  async SaveUserTestV1(nodeId, ParentNodeId, body) {
    try {
      var { data } = await axios.post(
        `/UserTestV1/SaveUserTest/${ParentNodeId}/${nodeId}/true`,
        {
          a: body,
        }
      );
      return { isSuccess: true, data };
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async setSucessTask(CourseId, ItemId) {
    try {
      var response = await axios.post("Progress/SetProgressPerTask", {
        CourseId,
        ItemId,
      });
      return {
        isSuccess: true,
        data: response.data,
      };
    } catch (err) {
      return {
        isSuccess: false,
      };
    }
  }

  async getProgress() {
    try {
      var { data } = await axios.get('CourseTree/GetDefaultCourseProgress')
      var value = data["CourseProgressTree"]["Progress"] * 100

      if (value > 0 && value < 1) {
          value = Math.ceil(value);
      } else if (value > 99 && value < 100) {
          value = Math.floor(value);
      } else {
          value = Math.round(value);
      }

      return [value, data["CourseProgressTree"]["Grade"]];
    } catch (err) {
      console.log(err)
      return {
        isSuccess: false,
      }
    }
  }

  async getAllProgress() {
    try {
      var { data } = await axios.get("CourseTree/GetCourseProgress/523592766")
      return data["CourseProgressTree"]["Children"]
    } catch (err) {
      return {
        isSuccess: false
      }
    }
  }

  calculateProgress(number) {
    number = number * 100

    if (number > 0 && number < 1) {
      number = Math.ceil(number);
    } else if (number > 99 && number < 100) {
      number = Math.floor(number);
    } else {
      number = Math.round(number);
    }

    return number;
  }
}
