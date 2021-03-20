const users = [];

//Join user to chat
function userJoin(id,username,room){
    const user = {id,username,room};
    users.push(user);
    return user;
}

//Get current user
function getCurrentUser(id){
    const user = users.find(user => user.id === id);
    return user;
}

//user leaves chat
function userLeave(id){
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        return users.splice(index,1)[0];
    }
}

//get all users from room
function getRoomUsers(room){
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};