import figlet from "figlet";
import PromptSync from "prompt-sync";
import EngDis from "./lib/engdis.lib.js";

const prompt = PromptSync({ sigint: true });
const baseUrlFe1 = "https://edservices.engdis.com/api/";
const baseUrlFe2 = "https://eduiwebservices20.engdis.com/api/";
class Main {
  setting = {
    baseUrl: "",
    username: "",
    password: "",
  };
  engdis = new EngDis();

  constructor() {
    this.welcome();
  }

  async main() {
    // await this.getInput();
    // const loginToken = await this.login();
    // if (!loginToken) process.exit();
    // this.engdis = new EngDis(this.setting.baseUrl, loginToken.UserInfo.Token);
    this.engdis = new EngDis(
      baseUrlFe2,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MjMyOTU3MDg5NTM5IiwibmJmIjoxNjc0ODAzMTY4LCJleHAiOjE2NzQ4MTAzNjgsImlhdCI6MTY3NDgwMzE2OH0.5pdcoxLDwuhKq26zO7gzMZRidriMWg-wNOw6094KTKA"
    );
    let courses = await this.selectCourse();
    await this.setTaskSuccess(courses);
    // await this.logout();
  }

  async welcome() {
    console.log(figlet.textSync("English Discoveries."));
    console.log(
      "[!] Bot for student kmitl only!, latest update at 27/01/23.\n"
    );
  }

  async logout() {
    console.log("\n[*] waiting logout...");
    await this.engdis.Logout();
    console.log("[#] logout success, see u soon.");
  }

  async getInput() {
    this.setting.baseUrl =
      (await prompt("[?] choose your subject ( fe1 or fe2 ) : ")) == "fe1"
        ? baseUrlFe1
        : baseUrlFe2;
    this.setting.username = await prompt("[?] enter your studentID  : ");
    this.setting.password = this.setting.username.replace("650", "");
    // this.setting.username = await prompt("[?] enter your username  : ");
    // this.setting.password = await prompt("[?] enter your passsword : ");
    console.log();
  }

  async login() {
    const engdis = new EngDis(this.setting.baseUrl);
    console.log("[*] waiting...");
    let result = await engdis.Login(
      this.setting.username,
      this.setting.password
    );
    if (!result.UserInfo) {
      console.log("[!] username or password is incorrect.");
    } else if (!result.UserInfo.Token) {
      console.log(
        "[!] please logout from website before use bot and try again."
      );
    } else {
      console.log("[#] login success.\n");
      return result;
    }
    return;
  }

  async selectCourse() {
    let courseProgressListTable = [];
    let courseTmp = [];
    // const selectAllCourse =
    // (await prompt("[?] select all course (y/n) : ")) == "y" ? true : false;
    const selectAllCourse = false;

    console.log();
    var courseProgressList = await this.engdis.getGetDefaultCourseProgress();
    if (!courseProgressList.isSuccess) {
      console.log("[!] token die, please login again.");
      process.exit();
    }

    courseProgressList.data.map((item) => {
      if (selectAllCourse) {
        console.log(`[#] you choose course ( ${item.Name} )`);
        courseTmp.push({
          NodeId: item.NodeId,
          ParentNodeId: item.ParentNodeId,
        });
      } else {
        courseProgressListTable.push({
          Id: item.NodeId,
          Name: item.Name,
        });
      }
    });

    if (selectAllCourse) return courseTmp;

    console.table(courseProgressListTable);
    // const selectId = await prompt("[?] select id or index : ");
    const selectId = 0;

    var find = courseProgressList.data.find(
      (ele, index) => ele.NodeId == selectId || index == selectId
    );

    if (!find) {
      console.log("[!] can't find id or index", selectId);
      return [];
    }

    console.log(`[#] you choose course ( ${find.Name} )`);
    courseTmp.push({
      NodeId: find.NodeId,
      ParentNodeId: find.ParentNodeId,
    });
    return courseTmp;
  }

  async setTaskSuccess(courses) {
    for (let course of courses) {
      var courseTree = await this.engdis.getCourseTree(
        course.NodeId,
        course.ParentNodeId
      );
      console.log(course.NodeId);
      let checked = false;
      await courseTree.data.map(async (item) => {
        // console.log(`\n[*] checking ( ${item.Name} )`);
        await item.Children.map(async (elem) => {
          if (elem.Name == "Test" && checked == false) {
            checked = true;
            this.test100Percent(
              course.NodeId,
              elem.ParentNodeId,
              elem.Children,
              item.Metadata.Code
            );
            // process.exit();
          } else {
            // console.log(`[#] checking ${elem.Name}`);
            // elem.Children.map(async (ele) => {
            //   if (!ele.IsDone) {
            //     await this.engdis.setSucessTask(
            //       course.ParentNodeId,
            //       ele.NodeId
            //     );
            //     console.log(elem);
            //   }
            // });
          }
        });
      });
    }
  }
  async test100Percent(nodeId, ParentNodeId, children, code) {
    let bodySend = [];
    for (let i = 0; children.length > i; i++) {
      let el = children[i];
      let number = i + 1;
      let body = {
        iId: el.NodeId,
        iCode: code + "t" + String(number).padStart(2, "0"),
        iType: "25",
        ua: [],
        bId: [],
      };
      var result = await this.engdis.practiceGetItem(el.NodeId, code, number);
      for (let ii = 0; result.data.i.q > ii; i++) {
      let ele = esult.data.i.q[i];
        console.log(ele)
        body.ua = [
          {
            qId: 1,
            aId: [[1, ele.al[0].a.findIndex((ele) => ele.c == "1")]],
          },
        ];
        ele.al[0].a.map((elel, ii) => {
          body.bId.push(ii + 1);
        });
        bodySend.push(body);
        console.log(ii);
      }
    }
    console.log(bodySend);
    // this.engdis.SaveUserTestV1(nodeId, ParentNodeId, bodySend);
  }
}

(async () => {
  const mainClass = new Main();
  mainClass.main();
})();
