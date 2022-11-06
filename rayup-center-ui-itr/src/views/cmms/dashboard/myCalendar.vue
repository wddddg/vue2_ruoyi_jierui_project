<template>
  <div class="app-container">
    <el-calendar v-model="value" >
      <div
        slot="dateCell"
        slot-scope="{ data }"
        v-popover:popover
        style="height: 100%"
      >
        <el-popover
          placement="top-start"
          title="详细信息"
          width="300"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <div>日期：{{ data.day }}</div>
          <div>
            <div>我的备忘：</div>
            <ul
              style="padding-inline-start: 0px; margin-top: 0px"
              v-if="showNotes(data.day)"
            >
              <li
                v-for="item in notes[data.day]"
                :key="item.title"
                :class="item.isSelected ? 'is-selected' : ''"
                @click="handleClick(item)"
              >
                {{ item.title }}
              </li>
            </ul>
            <ul style="padding-inline-start: 0px; margin-top: 0px" v-else>
              <li>空</li>
            </ul>
          </div>
          <el-button
            type="success"
            icon="el-icon-plus"
            circle
            size="mini"
            @click="handleAddNote(data.day)"
          />
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="handleEditNote(data.day)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="handleDelNote"
          />
          <!-- <div>
            <div>我的日志：</div>
          </div>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            class="calendar-edit-bth"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            class="calendar-edit-bth"
          /> -->
          <div style="height: 100%" slot="reference">
            <p>
              {{ data.day.split("-").slice(2).join() }}
              <!-- {{ showNotes(data.day) ? "" : "" }} -->
            </p>
            <el-image v-if="showNotes(data.day)" :src="require('../../../assets/images/note.png')" style="height: 20px; width: 20px"></el-image>
          </div>
        </el-popover>
      </div>
    </el-calendar>
    <el-dialog title="备忘详情" :visible.sync="noteVisible" v-if="noteVisible">
      <el-form
        ref="noteForm"
        :model="noteForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="标题" prop="title">
          <jereh-input v-model="noteForm.title" ph="请输入标题"></jereh-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-time-picker
                v-model="noteForm.startTime"
                ph="请选择开始时间"
                value-format="HH:mm:ss"
              ></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-time-picker
                v-model="noteForm.endTime"
                ph="请选择结束时间"
                value-format="HH:mm:ss"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否提醒" prop="remind">
              <jereh-select
                v-model="noteForm.remind"
                ph="请选择开始时间"
                clearable
                :dict="dict.type.sys_yes_no"
              ></jereh-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提前提醒时间(m)" prop="advanceTime">
              <jereh-input
                v-model="noteForm.advanceTime"
                ph="请选择结束时间"
                :disabled="noteForm.remind !== 'Y'"
              ></jereh-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="提醒方式" prop="remindType">
          <jereh-select
            v-model="noteForm.remindType"
            ph="请选择提醒方式"
            clearable
            :dict="dict.type.note_remind_type"
            :disabled="noteForm.remind !== 'Y'"
          ></jereh-select>
        </el-form-item>
        <el-form-item label="备忘内容" prop="remarks">
          <jereh-input
            v-model="noteForm.remarks"
            ph="请选择结束时间"
            type="textarea"
          ></jereh-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noteVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleNoteSave">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改详情" :visible.sync="editVisible" v-if="editVisible">
      <el-form
        ref="editNote"
        :model="editNote"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="id" prop="id" hidden="hidden">
          <jereh-input v-model="editNote.id"></jereh-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <jereh-input v-model="editNote.title" ph="请输入标题"></jereh-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-time-picker
                v-model="editNote.startTime"
                ph="请选择开始时间"
                value-format="HH:mm:ss"
              ></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-time-picker
                v-model="editNote.endTime"
                ph="请选择结束时间"
                value-format="HH:mm:ss"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否提醒" prop="remind">
              <jereh-select
                v-model="editNote.remind"
                ph="请选择开始时间"
                clearable
                :dict="dict.type.sys_yes_no"
              ></jereh-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提前提醒时间(m)" prop="advanceTime">
              <jereh-input
                v-model="editNote.advanceTime"
                ph="请选择结束时间"
                :disabled="editNote.remind !== 'Y'"
              ></jereh-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="提醒方式" prop="remindType">
          <jereh-select
            v-model="editNote.remindType"
            ph="请选择提醒方式"
            clearable
            :dict="dict.type.note_remind_type"
            :disabled="editNote.remind !== 'Y'"
          ></jereh-select>
        </el-form-item>
        <el-form-item label="备忘内容" prop="remarks">
          <jereh-input
            v-model="editNote.remarks"
            ph="请选择结束时间"
            type="textarea"
          ></jereh-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditNoteSave">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listCalendar,
    getCalendar,
    addCalendar,
    updateCalendar,
    delCalendar
  } from "../../../api/cmms/calendar";
export default {
  dicts: ["sys_yes_no", "note_remind_type"],
  data() {
    return {
      value: new Date(),
      notes: {
        // "2022-10-03": [
        //   { date: "2022-10-03", title: "测试标题1", id: 1 },
        //   { date: "2022-10-03", title: "测试标题2", id: 2 },
        //   { date: "2022-10-03", title: "测试标题3", id: 3 },
        // ],
        "2022-10-04": [{ date: "2022-10-04", title: "测试标题", id: 4 }],
        "2022-10-06": [{ date: "2022-10-06", title: "测试标题", id: 5 }],
        "2022-10-08": [{ date: "2022-10-08", title: "测试标题", id: 6 }],
        "2022-01-08": [{ date: "2022-01-08", title: "测试标题", id: 7 }],
      },
      editNote: {},
      noteVisible: false,
      editVisible: false,
      noteForm: {},
      rules: {
        title: [
          { required: true, message: "备忘标题不能为空", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" },
        ],
        remind: [
          { required: true, message: "请选择是否提醒", trigger: "change" },
        ],
        advanceTime: [
          {
            validator: (rule, value, callback) => {
              if (/^(?:[1-9]\d*)$/.test(value) == false) {
                callback(new Error("请输入正整数"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getNotes()
  },
  methods: {
    getNotes(){
      listCalendar().then(  (response) => {
        let resData = response.data;
        let notesMap= new Map();
        resData.forEach((item,index,arr)=>{
          if (!notesMap.has(item.calendarTime)){
            notesMap.set(item.calendarTime,arr.filter(a=>a.calendarTime==item.calendarTime))
          }
        });
        const obj=Object.fromEntries(notesMap);
       // console.log(obj);
        this.notes=obj;
      });
    },
    showNotes(date) {
      for (let key in this.notes) {
        if (key === date) {
          return true;
        }
      }
      return false;
    },
    handleClick(item) {
      console.log(item);
      console.log(this.notes[item.calendarTime]);
      for (let i = 0; i < this.notes[item.calendarTime].length; i++) {
        if (this.notes[item.calendarTime][i].id === item.id) {
          this.$set(item, "isSelected", true);
        } else {
          this.$set(this.notes[item.calendarTime][i], "isSelected", false);
        }
      }
      this.editNote = item;
    },
    handleAddNote(date) {
      this.noteForm = {
        calendarTime: date,
        startTime: "00:00:00",
        endTime: "23:59:59",
      };
      this.noteVisible = true;
      console.log(date)
    },
    handleEditNote(data) {
      //console.log(data);
      //根据日历相关带出查询相关
      //this.noteForm = this.editNote;
      if (this.notes[data]){
        this.editVisible = true;
      }
    },
    handleDelNote() {
      console.log("删除此备忘");
      this.editNote = {};
    },
    handleEditNoteSave(){
      let editNote = this.editNote;
      console.log(editNote);
      updateCalendar(editNote).then((response)=>{
        if (response.code===200){
          this.editVisible = false;
          this.$modal.msgSuccess("新增成功");
          this.getNotes();
        }else {
          this.$modal.msgError("修改失败，请联系管理员");
        }
      })
    },
    handleNoteSave() {
      let noteForm = this.noteForm;
      addCalendar(noteForm).then((response) => {
        if (response.code===200){
          this.noteVisible=false;
          this.$modal.msgSuccess("修改成功");
          this.getNotes();
        }else {
          this.$modal.msgError("新增失败，请联系管理员");
        }
      })
    },
  },
};
</script>
<style scoped>
.is-selected {
  background: #409eff;
  color: #fff;
}
li {
  list-style-position: inside;
  border-radius: 5px;
}
li:hover {
  color: #fff;
  list-style-image: dist;
  background: #409eff;
  display: block;
  border: 1px solid #a1a1a1;
  border-radius: 5px;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #ebebeb;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #ebebeb;
  padding: 10px;
}
::v-deep .el-dialog__body {
  padding-left: 0px;
  padding-top: 30px;
  padding-bottom: 10px;
  padding-right: 40px;
}
</style>
