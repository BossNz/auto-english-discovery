import figlet from "figlet";
import PromptSync from "prompt-sync";
import { engdis } from "./lib/engdis.lib";
const prompt = PromptSync({ sigint: true });
(async () => {
    console.clear()
    console.log(figlet.textSync("EngDis Auto"))
    console.log("by BossNz | Kmitl CS28")
    console.log("======== LOGIN ========")
    const username = prompt("Enter your username : ");
    const password = prompt("Enter your password : ");

    const engDisLoginClass = new engdis()
    var resultLogin = await engDisLoginClass.Login(username, password)
    if (!resultLogin.UserInfo) return console.log("[ ERROR ] => Username or password is incorrect")
    if (!resultLogin.UserInfo.Token) return console.log("[ ERROR ] => Please logout from the website")
    const engDisClass = new engdis(resultLogin.UserInfo.Token)
    var CourseProgressList = await engDisClass.getGetDefaultCourseProgress()
    if (!CourseProgressList.isSuccess) return console.log("[ ERROR ] => Token error")
    console.clear()
    let CourseProgressListTable = []
    CourseProgressList.data.map(item => {
        CourseProgressListTable.push({
            Id: item.NodeId,
            Name: item.Name
        })
    })
    console.table(CourseProgressListTable)
    const IdUnit = prompt("Select Id or Index : ");
    console.clear()
    var findUnit = CourseProgressList.data.find((ele, index) => ele.NodeId == IdUnit || index == IdUnit)
    if (!findUnit) return console.log(`[ ERROR ] => Not found ID or Index`)
    var CourseList = await engDisClass.getCourseTree(findUnit.NodeId, findUnit.ParentNodeId)

    let CourseListTable = []
    CourseList.data.map(item => {
        CourseListTable.push({
            Id: item.NodeId,
            Name: item.Name
        })
    })
    CourseListTable.push({
        Id: 99999,
        Name: 'Select all'
    })
    console.table(CourseListTable)
    const IdTest = prompt("Select Id or Index : ");
    console.clear()
    var checkSelectAll = CourseListTable.find((ele, index) => ele.Id == IdTest || index == IdTest)
    if (checkSelectAll.Id == 99999) {
        CourseList.data.map(item => {
            console.log(`RUN SCRIPT => ${item.Name} . . .`)
            item.Children.map(elem => {
                if (elem.Name == "Explore" || elem.Name == "Practice") {
                    elem.Children.map(async ele => {
                        if (!ele.IsDone) {
                            await engDisClass.setSucessTask(findUnit.ParentNodeId, ele.NodeId)
                            console.log(`[ SUCCESS ] => Set Task ${ele.NodeId} Success!!`)
                        } else {
                            console.log(`[ SUCCESS ] => Task ${ele.NodeId} Success!!`)
                        }
                    })
                }
            })
        })
    } else {
        var findTest = CourseList.data.find((ele, index) => ele.NodeId == IdTest || index == IdTest)
        if (!findTest) return console.log(`[ ERROR ] => Not found ID or Index`)
        console.log(`RUN SCRIPT => ${findTest.Name} . . .`)
        findTest.Children.map(elem => {
            if (elem.Name == "Explore" || elem.Name == "Practice") {
                elem.Children.map(async ele => {
                    if (!ele.IsDone) {
                        await engDisClass.setSucessTask(findUnit.ParentNodeId, ele.NodeId)
                        console.log(`[ SUCCESS ] => Set Task ${ele.NodeId} Success!!`)
                    } else {
                        console.log(`[ SUCCESS ] => Task ${ele.NodeId} Success!!`)
                    }
                })
            }
        })
    }
    await engDisClass.Logout()
})();