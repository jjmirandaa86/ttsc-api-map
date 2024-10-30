export class User {
    var tableName = "user";

    this id;
    var 	name,
	lastName, 
	password,
	email,
	status;
    function constructor(id,name) {
            id = this.id; 
            name = this.name;
    }
    function getId() {
        return id;
    }

    function setId(id) {
        id = this.id;
    }
}

module.exports = User;