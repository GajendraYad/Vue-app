<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <div class="container-fluid justify-content-center">
      <a class="navbar-brand text-center" href="#" style="color: #cccccc; text-align: center;">User Login</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <span class="mt-1 justify-end" style="color: #ffffff;">
        <timer></timer>
      </span>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 m-auto">
        <div class="d-block">
          <div class="mt-4">
            <timer></timer>
          </div>
          <form  @submit.prevent="onLogin" class="justify-content-start" style="text-align: left;">
            <div class="mt-5 mb-3">
              <label class="form-label">Username</label>
              <input type="text" v-model="username" class="form-control" placeholder="Enter Username">
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" v-model="password" class="form-control" placeholder="Enter Password">
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled">
                <label class="form-check-label" for="flexCheckDisabled">
                  Remember Me
                </label>
              </div>
            </div>
            <div class="mb-4">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
import axios from 'axios'
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      detailsAreVisible: false,
      friend: {
        id: 'Gajendra',
        name: 'Gajendra Yadav',
        phone: '9027826781',
        email: 'gajendra@gmail.com'
      },

      users: [],
      email: '',
      password: '',
      decoded: '',
      token: '',
      baseUR: 'http://localhost:8080/',
      dateTime: '' 
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },

    onLogin() {
      const formData = {
        username: this.username,
        password: this.password,
        rememberMe: true
      }
      console.log(formData)
      this.$router.push('User');
      

    //   var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiYXV0aCI6IkNSRUFURV9CSU5fTE9DQVRJT04sQ1JFQVRFX0NMSUVOVCxDUkVBVEVfQ09NUEFOWSxDUkVBVEVfQ09VTlRSWSxDUkVBVEVfQ1VSUkVOQ1ksQ1JFQVRFX0dST1VQLENSRUFURV9NQUNISU5FLENSRUFURV9NQUNISU5FX0NBVEVHT1JZLENSRUFURV9NQUNISU5FX01BTlVGQUNUVVJFUixDUkVBVEVfTUFDSElORV9NT0RFTCxDUkVBVEVfTUFJTlRFTkFOQ0VfREVQQVJUTUVOVCxDUkVBVEVfTU9ERUxfQ0FURUdPUlksQ1JFQVRFX09SREVSLENSRUFURV9QQVlNRU5ULENSRUFURV9QTEFOVCxDUkVBVEVfUFJPRFVDVElPTl9MSU5FLENSRUFURV9SRVBPUlQsQ1JFQVRFX1JPTEUsQ1JFQVRFX1NQQVJFLENSRUFURV9TVERfU0VSVklDRV9TUEVDLENSRUFURV9TVE9SQUdFX0xPQ0FUSU9OLENSRUFURV9UQVgsQ1JFQVRFX1VPTSxDUkVBVEVfVVNFUixDUkVBVEVfVkVORE9SLERFTEVURV9CSU5fTE9DQVRJT04sREVMRVRFX0NMSUVOVCxERUxFVEVfQ09NUEFOWSxERUxFVEVfQ09VTlRSWSxERUxFVEVfQ1VSUkVOQ1ksREVMRVRFX0dST1VQLERFTEVURV9NQUNISU5FLERFTEVURV9NQUNISU5FX0NBVEVHT1JZLERFTEVURV9NQUNISU5FX01BTlVGQUNUVVJFUixERUxFVEVfTUFDSElORV9NT0RFTCxERUxFVEVfTUFJTlRFTkFOQ0VfREVQQVJUTUVOVCxERUxFVEVfTU9ERUxfQ0FURUdPUlksREVMRVRFX09SREVSLERFTEVURV9QQVlNRU5ULERFTEVURV9QTEFOVCxERUxFVEVfUFJPRFVDVElPTl9MSU5FLERFTEVURV9SRVBPUlQsREVMRVRFX1JPTEUsREVMRVRFX1NQQVJFLERFTEVURV9TVERfU0VSVklDRV9TUEVDLERFTEVURV9TVE9SQUdFX0xPQ0FUSU9OLERFTEVURV9UQVgsREVMRVRFX1VPTSxERUxFVEVfVVNFUixERUxFVEVfVkVORE9SLEVESVRfQklOX0xPQ0FUSU9OLEVESVRfQ0xJRU5ULEVESVRfQ09NUEFOWSxFRElUX0NPVU5UUlksRURJVF9DVVJSRU5DWSxFRElUX0dST1VQLEVESVRfTUFDSElORSxFRElUX01BQ0hJTkVfQ0FURUdPUlksRURJVF9NQUNISU5FX01BTlVGQUNUVVJFUixFRElUX01BQ0hJTkVfTU9ERUwsRURJVF9NQUlOVEVOQU5DRV9ERVBBUlRNRU5ULEVESVRfTU9ERUxfQ0FURUdPUlksRURJVF9PUkRFUixFRElUX1BBWU1FTlQsRURJVF9QTEFOVCxFRElUX1BST0RVQ1RJT05fTElORSxFRElUX1BST0ZJTEUsRURJVF9ST0xFLEVESVRfU1BBUkUsRURJVF9TVERfU0VSVklDRV9TUEVDLEVESVRfU1RPUkFHRV9MT0NBVElPTixFRElUX1RBWCxFRElUX1VPTSxFRElUX1VTRVIsRURJVF9WRU5ET1IsRlVMTF9BQ0NFU1MsTElTVF9CSU5fTE9DQVRJT04sTElTVF9DTElFTlQsTElTVF9DT01QQU5ZLExJU1RfQ09VTlRSWSxMSVNUX0NVUlJFTkNZLExJU1RfR1JPVVAsTElTVF9NQUNISU5FLExJU1RfTUFDSElORV9DQVRFR09SWSxMSVNUX01BQ0hJTkVfTUFOVUZBQ1RVUkVSLExJU1RfTUFDSElORV9NT0RFTCxMSVNUX01BSU5URU5BTkNFX0RFUEFSVE1FTlQsTElTVF9NT0RFTF9DQVRFR09SWSxMSVNUX09SREVSLExJU1RfUEFZTUVOVCxMSVNUX1BMQU5ULExJU1RfUFJPRFVDVElPTl9MSU5FLExJU1RfUk9MRSxMSVNUX1NQQVJFLExJU1RfU1REX1NFUlZJQ0VfU1BFQyxMSVNUX1NUT1JBR0VfTE9DQVRJT04sTElTVF9UQVgsTElTVF9VT00sTElTVF9VU0VSLExJU1RfVkVORE9SLE1PRElGWV9SRVBPUlQsUkVBRF9SRVBPUlQsUkVTRVRfUEFTU1dPUkQsVklFV19SRVBPUlQiLCJleHAiOjE2Mzg4ODg1MDF9.ysH_GrGNPpDU2y6dCyI_3zUkJQUEJdJ5dInwzjQUIW04y7NtK0gmCRvcdS0Bxu_flbqrYwNWY3kas8YfkO9UmQ";
    //   var decoded = jwt_decode(token);
    //   console.log(decoded);

      return axios.post('http://localhost:8080/api/v1/authenticate', formData)
        .then(res => {
            console.log(res),
            this.decoded = jwt_decode(res.access_token)
            console.log(res.access_token)
            localStorage.setItem('token', res.access_token)
        })

        

    }


  },
  mounted() {
    this.dateTime = new Date();
  },
}
</script>
