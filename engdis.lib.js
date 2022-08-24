import axios from "axios";
export class engdis {
    constructor(authorization = "") {
        axios.defaults.baseURL = "https://edservices.engdis.com/api/";
        if (authorization) axios.defaults.headers.authorization = "Bearer " + authorization
    }
    async Login(username, password) {
        try {
            var { data } = await axios.post("Auth", {
                CommunityVersion: "100",
                InstitutionId: "5232957", // Kmitl
                Password: password,
                UserName: username
            })
            return data
        } catch (e) {
            return {
                isSuccess: false,
            }
        }
    }
    async Logout() {
        try {
            var { data } = await axios.get("Auth/Logout")
            return data
        } catch (e) {
            return {
                isSuccess: false,
            }
        }
    }
    async getGetDefaultCourseProgress() {
        try {
            var { data } = await axios.get("CourseTree/GetDefaultCourseProgress")
            return {
                isSuccess: true,
                data: data.CourseProgressTree.Children
            }
        } catch (err) {
            return {
                isSuccess: false,
                data: err.response.data
            }
        }
    }
    async getCourseTree(NodeId, ParentNodeId) {
        try {
            var { data } = await axios.post("CourseTree/GetUserNodeProgress/" + ParentNodeId, [
                {
                    ParticleId: NodeId,
                    NodeType: 2,
                    LockedNodes: null,
                    particleHasProgress: true,
                    lowestNodeType: 5,
                },
            ]);
            return {
                isSuccess: true,
                data: data[0].Children
            }
        } catch (err) {
            return {
                isSuccess: false,
                data: err.response.data
            }
        }
    }
    async setSucessTask(CourseId, ItemId) {
        try {
            var { data } = await axios.post("Progress/SetProgressPerTask", {
                CourseId,
                ItemId
            })
            return {
                isSuccess: true,
                data: data
            }
        } catch (err) {
            return {
                isSuccess: false,
            }
        }
    }
}
