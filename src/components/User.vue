<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <div class="container-fluid justify-content-center">
      <a class="navbar-brand text-center" href="#" style="color: #cccccc; text-align: center;">User Information</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <span class="mt-1" style="color: #ffffff;">
        <timer></timer>
      </span>
    </div>
  </nav>
  <div class="container-fluid">
    <app-timer></app-timer>
    <div class="row">
      <div class="col-lg-12 mt-3 justify-content-end">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_emp" data-bs-whatever="@mdo">Add Employee</button>
      </div>
      <div class="col-md-8 m-auto">
        <div class="panel panel-default mt-4">
          <div class="panel-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.employee_name }}</td>
                  <td>{{ user.employee_age }}</td>
                  <td>{{ user.employee_salary }}</td>
                  <td>
                    <button type="button" class="btn btn-secondary mr-2" @click="editEmployee(user.id)"
                     data-bs-toggle="modal" data-bs-target="#update_emp" data-bs-whatever="@mdo">Edit</button>
                    <button type="button" class="btn btn-danger ml-2" @click="deleteEmployee(user.id)" style="margin-left: 15px;">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="add_emp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Employee</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addEmployee" method="post" class="justify-content-start">
            <div class="mb-3">
              <label class="col-form-label">Name</label>
              <input type="text" class="form-control" name="name" v-model="addform.name">
            </div>
            <div class="mb-3">
              <label class="col-form-label">Salary</label>
              <input type="text" class="form-control" name="salary" v-model="addform.salary">
            </div>
            <div class="mb-3">
              <label class="col-form-label">Age</label>
              <input type="text" class="form-control" name="age" v-model="addform.age">
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Add Employee</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="update_emp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Employee</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateEmployee(updateform.id)" method="post">
            <div class="mb-3">
              <label class="col-form-label">Name</label>
              <input type="text" class="form-control" name="name" v-model="updateform.name">
            </div>
            <div class="mb-3">
              <label class="col-form-label">Salary</label>
              <input type="text" class="form-control" name="salary" v-model="updateform.salary">
            </div>
            <div class="mb-3">
              <label class="col-form-label">Age</label>
              <input type="text" class="form-control" name="age" v-model="updateform.age">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Update Employee</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  name: "UserList",
  data() {
    return {
      detailsAreVisible: false,
      users: [],
      email: '',
      password: '',
      decoded: '',
      token: '',
      weatherDataList: [],
      addform: {
        name: '',
        salary: '',
        age: ''
      },
      updateform: {
        id: '',
        name: '',
        salary: '',
        age: ''
      }
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },    
    getUserList() {
      return axios.get('http://localhost:8080/api/v1/employees')
        .then(response => {
          console.log(response.data.data);
          this.users = response.data.data;
          })     
    },
    addEmployee() {
      console.log(this.addform);
      return axios.post('http://localhost:8080/api/v1/create', this.addform)
        .then(response => {
          console.log(response.data.data);
          this.users.push(response.data.data);
          this.getUserList();
      })
    },
    editEmployee(id) {
      return axios.get('http://localhost:8080/api/v1/employee/'+id)
        .then(response => {
          console.log(response.data.data.id);
          console.log(response.data.data);
          this.updateform.id = response.data.data.id;
          this.updateform.name = response.data.data.employee_name;
          this.updateform.salary = response.data.data.employee_age;
          this.updateform.age = response.data.data.employee_salary;
      })
    },
    updateEmployee(id) {
      return axios.put('http://localhost:8080/public/api/v1/update/'+id, this.updateform.data)
        .then(response => {
          console.log(response.data.data);
          this.users.push(response.data.data);
          this.getUserList();
      })
    },
    deleteEmployee(id) {
      return axios.delete('http://localhost:8080/api/v1/delete/'+id)
      .then(() => {
        this.users.splice(id, 1);
        this.getUserList();
      })
    }
  },
  mounted() {
    this.getUserList();
  },
}
</script>
