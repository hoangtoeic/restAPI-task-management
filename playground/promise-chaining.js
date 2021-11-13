require('../src/db/mongoose')
const User=require('../src/models/user')

// User.findByIdAndUpdate('617bb626c568511468ee5152',{age:1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:6})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCout=async(id,age)=>{
    const user=await User.findByIdAndUpdate(id,{age:age})
    const count=await User.countDocuments({age:age})
    return count
}

updateAgeAndCout('617bb626c568511468ee5152',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})