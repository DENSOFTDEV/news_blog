<template>
    <div>
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row justify-content-around mt-2">
                    <!-- left column -->
                    <div class="col-md-10">
                        <!-- general form elements -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Add New Post</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form role="form" @submit.prevent="addNewPost()" enctype="multipart/form-data">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="postId">Add Post</label>
                                        <input type="text" class="form-control" id="postId" placeholder="Add Post"
                                               v-model="form.title" name="title" :class="{ 'is-invalid': form.errors.has('title') }">
                                        <has-error :form="form" field="title"></has-error>
                                    </div>
                                    <div class="form-group">
                                        <label>Add Description</label>
                                        <markdown-editor v-model="form.description"></markdown-editor>
                                        <has-error :form="form" field="description"></has-error>
                                    </div>
                                    <div class="form-group">
                                        <label for="cat_id">Select Category</label>
                                       <select class="form-control" id="cat_id" :class="{ 'is-invalid': form.errors.has('cat_id') }" v-model="form.cat_id">
                                           <option disabled value="">Select One</option>
                                           <option v-for="category in getallCategory" :value="category.id">{{category.cat_name}}</option>
                                       </select>
                                        <has-error :form="form" field="cat_id"></has-error>
                                    </div>
                                    <div class="form-group">
                                        <input type="file" @change="changePhoto($event)" name="photo" :class="{ 'is-invalid': form.errors.has('photo') }">
                                        <img :src="form.photo" alt="" width="80" height="80">
                                        <has-error :form="form" field="photo"></has-error>
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                        <!-- /.card -->
                    </div>
                    <!--/.col (left) -->

                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
        </section>
    </div>
</template>

<script>


    export default {
        name: "New",
        data(){
            return{
                //create new instance of v-form
                form: new Form({
                    title: '',
                    description:'',
                    cat_id:'',
                    photo:''
                })
            }
        },
        mounted(){
            this.$store.dispatch("allCategory")
        },
        computed:{
            getallCategory(){
                return this.$store.getters.getCategory
            }
        },
        methods:{
            changePhoto(event){
                let file = event.target.files[0];

                if (file.size> 1048576) {

                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                }else {
                    let reader = new FileReader();

                    reader.onload = event => {
                        this.form.photo = event.target.result
                    };

                    reader.readAsDataURL(file);
                }
            },
            addNewPost(){
                this.form.post('savepost')
                    .then(()=>{
                        this.$router.push('/post-list')

                        toast.fire({
                            icon: 'success',
                            title: 'Post added successfully'
                        })
                    })
                    .catch((err)=>{
                        alert(err)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
