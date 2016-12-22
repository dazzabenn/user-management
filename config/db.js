/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

var crypto = require('crypto');

module.exports = function() {
    return {
        userList : [],

        save(user) {
            user.id = crypto.randomBytes(20).toString('hex');
            user.created = new Date();
            this.userList.push(user);

            return user;           
        },
        
        find(id) {
            if(id) {
                return this.userList.find(element => {
                    return element.id === id;
                }); 
            } else {
                return this.userList;
            }
        },

        findByEmail(email) {
             return this.userList.find(element => {
                    return element.email === email;
                }); 
        },

        remove(id) {
            var found = 0;
            this.userList = this.userList.filter(element => {
                if(element.id === id) {
                    found = 1;
                } else {
                    return element.id !== id;
                }
            });
            return found;           
        },

        update(id, user) {
            var userIndex = this.userList.findIndex(element => {
                return element.id === id;
            });
            if(userIndex !== -1) {
                this.userList[userIndex].email = user.email;
                this.userList[userIndex].forename = user.forename;
                this.userList[userIndex].surname = user.surname;
                this.userList[userIndex].updated = new Date();

                return this.userList[userIndex];
            }
        }       
    };
};