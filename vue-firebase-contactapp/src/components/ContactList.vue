<template>

  <div id="app" class="container">
    <div class="page-header">
      <h1> Vue Contact App</h1>
    </div>
    <h3>Add a Contact</h3>

    <!--Form to create new contact and push to firebase database also data being binded to a newContact object-->
    <div class="container" id="c-add">

      <form id="addform" v-on:submit.prevent="addContact">
        <div class="form-group">
          <label for="firstname">Firstname</label>
          <input id="firstname" type="text" class="form-control" v-model="contact.firstname"
                 style="max-width: 200px;" required/>
        </div>

        <div class="form-group">
          <label for="lastname">Lastname</label>
          <input id="lastname" type="text" class="form-control" v-model="contact.lastname"
                 style="max-width: 200px;" required/>
        </div>

        <div class="form-group">
          <label for="dob">D.O.B</label>
          <input id="dob" type="text" class="form-control" v-model="contact.dob" style="max-width: 200px;"
                 required/>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="text" class="form-control" v-model="contact.email" style="max-width: 200px;"
                 required/>
        </div>


        <div class="form-group">
          <label for="address">Address</label>
          <textarea id="address" class="form-control" v-model="contact.address"></textarea>
        </div>

        <div class="form-group">
          <label for="phoneNum">Phone-Number</label>
          <input id="phoneNum" type="text" class="form-control" v-model="contact.phoneNum"
                 style="max-width: 200px;" required/>
        </div>
        <button type="submit" class="btn btn btn-primary"> Add Contact</button>
      </form>
    </div>
    <div class="container" id="c-list">
      <h3>Contacts List</h3>

      <div class="container bootstrap snippet">
        <div class="row">
          <div class="col-lg-8">
            <div class="panel panel-default">
              <div class="panel-body p-t-0">
                <div class="input-group">

                  <input type="text" id="searcher" v-model="search" class="form-control"
                         placeholder="Search for a Contact by Firstname"
                  ><span class="input-group-btn">
                            <button type="button" class="btn btn-effect-ripple btn-primary"><i class="fa fa-search"></i></button>
                        </span>


                </div>
              </div>
            </div>
          </div>
        </div>
        <!--For loop to iterate over database contacts-->
        <div class="row" v-for="contact in ContactSearch">
          <div class="col-sm-6">
            <div class="panel">
              <div class="panel-body p-t-10">
                <div class="media-main">
                  <a class="pull-left" href="#">
                    <img class="thumb-lg img-circle bx-s" src="https://bootdey.com/img/Content/user_1.jpg" alt="">
                  </a>
                  <div class="pull-right btn-group-sm">
                    <a href="#" v-on:click="editContact(contact)" class="btn btn-success tooltips" data-placement="top"
                       data-toggle="modal" data-target="#edit" data-original-title="Edit">
                      <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" v-on:click="removeContact(contact)" class="btn btn-danger tooltips" data-placement="top"
                       data-toggle="tooltip" data-original-title="Delete">
                      <i class="fa fa-close"></i>
                    </a>
                  </div>

                </div>
                <div class="info">
                  <h4><b>{{ contact.firstname}} {{contact.lastname}}</b></h4>
                  <p><b>Email:</b> {{contact.email}}</p>
                  <p style="margin-left: 30px;"><b>Phone Number:</b> {{contact.phoneNum}}</p>
                  <p style="margin-left: 30px;"><b>D.O.B:</b> {{contact.dob}}</p>
                  <p style="margin-left: 30px;"><b>Address:</b> {{contact.address}}</p>

                </div>
                <hr>
              </div>
            </div>
          </div>

          <!--Modal which binds the current selected contact with the form fields being edited this is
          activated when the edit link is clicked-->
          <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit"
               aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span
                    class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                  <h4 class="modal-title custom_align" id="Heading">Edit Details for {{contact.firstname}}</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <input class="form-control " type="text" v-model="contact.firstname">
                  </div>
                  <div class="form-group">

                    <input class="form-control " type="text" v-model="contact.lastname">
                  </div>
                  <div class="form-group">

                    <input class="form-control " type="text" v-model="contact.dob">
                  </div>
                  <div class="form-group">

                    <input class="form-control " type="text" v-model="contact.email">
                  </div>

                  <div class="form-group">

                    <input class="form-control " type="text" v-model="contact.phoneNum">
                  </div>
                  <div class="form-group">
                    <textarea rows="2" class="form-control" v-model="contact.address"></textarea>


                  </div>
                </div>
                <div class="modal-footer ">
                  <button type="button" class="btn btn-warning btn-lg" style="width: 100%;"
                          v-on:click="updateContact(contact)" data-dismiss="modal"> Update
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>


</template>


<script>
  //Use of toastr to give user feedback
  import toastr from 'toastr'
  //importing configuration for my firebase realtime database
  import {contactsRef} from '../firebase-config'

  export default {
    name: 'contact-list',
    firebase: {
      contacts: contactsRef

    },
    data() {

      return {

        contact: {

          firstname: '',
          lastname: '',
          email: '',
          phoneNum: '',
          dob: '',
          address: '',
          edited: false

        },
        search: ''
      }

    },
    methods: {

      addContact: function () {
        //this method adds a contact to the database and then toasts a message and reset the fields
        contactsRef.push(this.contact)
        toastr.success('Contact Sucessfully Added', 'CONFIRMED')
        this.contact.firstname = ''
        this.contact.dob = ''
        this.contact.phoneNum = ''
        this.contact.address = ''
        this.contact.lastname = ''
        this.contact.email = ''

      },
      removeContact: function (contact) {
        //this method removes a contact via the key from the firebase db then toasts a message for user feedback
        contactsRef.child(contact['.key']).remove();
        toastr.error('Contact Succesfully Removed', 'ATTENTION!')

      },
      editContact: function (contact) {
        //this methods just sets the edited field of a contact to true
        contactsRef.child(contact['.key']).update({edited: true})

      },
      updateContact: function (contact) {
        //this method updates the values of the various fields edited in the modal which binds the selected contact

        console.log('starting')

        contactsRef.child(contact['.key']).update(
          {
            firstname: contact.firstname,
            lastname: contact.lastname,
            address: contact.address,
            email: contact.email,
            dob: contact.dob,
            phoneNum: contact.phoneNum
          }
        )
        console.log('ending')

        toastr.warning('Changed Fields Updated', 'UPDATE')

      }

    },
    //THIS COMPUTED METHOD IS USED TO FILTER THE CONTACTS OBJECTS FIRSTNAME PROPERTY BY WHATEVER IS TYPED IN THE SEARCH FIELD
    computed: {
      ContactSearch: function () {

        return this.contacts.filter((contact) => {

          return contact.firstname.match(this.search);

        })

      }
    }

  }


</script>

<style scoped>

  textarea {
    width: 200px;
    height: 100px;
  }

  #c-list {
    margin-left: 250px;
    margin-top: -580px;

  }

  body {
    margin-top: 20px;
    background-color: #edf0f0;
  }

  .btn-primary,
  .btn-primary:hover,
  .btn-primary:focus,
  .btn-primary:active,
  .btn-primary.active,
  .btn-primary.focus,
  .btn-primary:active,
  .btn-primary:focus,
  .btn-primary:hover,
  .open > .dropdown-toggle.btn-primary {
    background-color: #3bc0c3;
    border: 1px solid #3bc0c3;
  }

  .p-t-10 {
    padding-top: 10px !important;
  }

  .media-main a.pull-left {
    width: 100px;
  }

  .thumb-lg {
    height: 84px;
    width: 84px;
  }

  .media-main .info {
    overflow: hidden;
    color: #000;
  }

  .media-main .info h4 {
    padding-top: 10px;
    margin-bottom: 5px;
  }

  .social-links li a {
    background: #EFF0F4;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    color: #7A7676;
  }


</style>
