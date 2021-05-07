const Sequelize = require('sequelize');     //class

module.exports = class User extends Sequelize.Model{
    static init(sequelize){ //sequelize라는 인자값을 넣어서 init함수를 정의해줌
        // 이 아래부분은 Sequelize.Model 이거의 init을 쓰려고
        return super.init({     //매서드
            userid : {
                // 여기 안에는 userid에 대한 설정값을 넣어주는 부분 (객체)
                // 부모에서 부터 받는 STRING
                type : Sequelize.STRING(20),
                allowNull : false,      // NOT NULL
                unique : true,          // id는 unique해야함 하나만 있어야함 - 같은건 들어갈 수 없다
            },
            userpw : {
                type : Sequelize.STRING(40),
                allowNull : false,
            },
            username : {
                type : Sequelize.STRING(10),
                allowNull : false,
            },
            gender: {
                type : Sequelize.BOOLEAN,
                allowNull : false,
            },
            userimage : {
                type : Sequelize.STRING(100),
                allowNull : true,
            },
            userdt :{
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW
            }
        },{
            //이부분은 User 자식한테 추가한 값
            sequelize,                  // 이것도 sequelize : sequelize , 라고 생각하면 됨
            timestamps : false,
            underscored:false,
            paranoid:false,
            modelName : 'User',         
            tableName : 'users',
            charset :'utf8',
            collate:'utf8_general_ci'
        });
    }
}

/*
이러한 필드값을 갖고싶음!
    userid
    userpw
    username
    gender
    userimage
    userdt
*/