<template>
  <main>
    <!-- Form -->
    <el-row class="list-title">
      <el-col :span="6" class="text_left"><i class="el-icon-menu"></i> &nbsp&nbsp班费贴</el-col>
      <el-col :span="6" :offset="12" class="text_right"> <el-button type="text" @click.native="dialogFormVisible = true"><i class="el-icon-plus"></i></el-button></el-col>
    </el-row> 
    <el-dialog title="新增" v-model="dialogFormVisible">
      <el-form :model="classMoneyForm">
        <el-form-item label="班级ID">
          <el-input v-model="classMoneyForm.class_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班费金额">
          <el-input v-model="classMoneyForm.howmuch" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker v-model="classMoneyForm.deadline" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        
        <el-select v-model="classMoneyForm.payed_members" multiple placeholder="请选择已付学生"> 
          <el-option v-for="item in user_options" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-select v-model="classMoneyForm.unpayed_members" multiple placeholder="请选择未付学生"> 
          <el-option v-for="item in user_options" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible = false" @click="createClassMoney">确 定</el-button>
      </div>
    </el-dialog>
    <ul>
      <li v-for="checkIn in classMoney">
        <el-row>
          <el-col :span="3">
            <p class="text_center"><img src="../assets/avator.jpg" alt="avator"></p>
            <p class="text_center">{{checkIn.creator.username}}
            </p>
          </el-col>
          <el-col :span="19" :offset="2">
            <h4>标题: {{checkIn.class_id}}收班费</h4>
            <p class="content">
              <p><strong>howmuch:</strong>{{checkIn.howmuch}}</p>
              <p><strong>deadline:</strong>{{checkIn.deadline}}</p>
              <p><strong>payed_members:</strong>{{checkIn.payed_members | showUsersName }}</p>
              <p><strong>unpayed_members:</strong>{{checkIn.unpayed_members | showUsersName }}</p>
            </p>
            <Comment :data.sync="checkIn" type="checkIn"/>
            </ul>
          </el-col>
        </el-row>
      </li>
    </ul>    
  </main>
</template>

<script>

import classMoneyService from '../services/classMoneyService'
import userService from '../services/userService'
import Comment from '../components/Comment'

export default {
  data () {
    let data = {
      dialogTableVisible:false,
      dialogFormVisible:false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      user_options:[],
      classMoney: [],
      classMoneyForm:{
        class_id:'',
        howmuch:0,
        deadline:'',
        payed_members:[],
        unpayed_members:[]
      },
    };
    return data;
  },

  components:{Comment},

  methods:{
    createClassMoney (){
      classMoneyService.createClassMoney(this.classMoneyForm)
      .then(()=>{
        classMoneyService.getClassMoneyList()
        .then(res =>{
          this.classMoney = res.body.json;
        }); 
      });
    }, 
  },
  
  created() {
    classMoneyService.getClassMoneyList().then(res =>{
      this.classMoney = res.body.json;
    });
    userService.getUserList().then(res =>{
        let json = res.body.json;
        let options = [];
        json.map((item,index)=>{
          options.push({label:item.username,value:item._id});
        });
        this.user_options = options;
    }); 
    
  },
}
</script>

<style>

</style>
