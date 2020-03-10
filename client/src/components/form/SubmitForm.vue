<script>
import axios from 'axios'
import { mdbBtn, mdbInput, mdbContainer, mdbRow, mdbCol } from 'mdbvue';

export default {
    name: "Submit",
    components: {
        mdbInput,
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbBtn
    },

    data() {
        return {
            title: '',
            description: '',
            showPost: true,
            showUpload: false,
            file: '',
            message: '',
            error: false
            // image: ''
        }
    },

    methods: {
        selectFile(){
            this.file = this.$refs.file.files[0]
            this.error = false
            this.message = ''
        },

        async submit() {
            const fd = new FormData()

            fd.append('title', this.title)
            fd.append('description', this.description)
            fd.append('image', this.file)
            
            try {
                await axios.post('http://localhost:5000/models', fd)
            }catch(e) {
                this.error = true
            }

            this.title = ''
            this.description = ''
            this.file = ''
        },

        showPostForm() {
            this.showPost = true
            this.showUpload = false
        },

        showUploadForm() {
            this.showUpload = true
            this.showPost = false
        },

    }

  }
</script>
<template>
<mdb-container>
    <mdb-row class="justify-content-md-center">
        
        <mdb-col class=gen col='8'>
            <mdb-row>
                <mdb-col class='column text-center'><span @click="showPostForm"><i class="fas fa-share-square"/> Post</span></mdb-col>
                <mdb-col class='column text-center c2' ><span @click="showUploadForm"><i class="fas fa-images"/> Image</span></mdb-col>
            </mdb-row>
            <mdb-row class="fluid" v-show="showPost">
                <mdb-col>
                        <mdb-input 
                            type="text" 
                            label="Title" 
                            v-model="title"
                            outline
                        />   
                        <mdb-input 
                            type="textarea" 
                            label="Outline textarea" 
                            v-model="description"
                            outline :rows="3" 
                        />
                    </mdb-col>
                    <div class="w-100"></div>
                    <mdb-col offset="10">
                        <mdb-btn 
                            color="primary"
                            @click="submit"
                        >
                        Post
                        </mdb-btn>
                    </mdb-col>
            </mdb-row>
            <mdb-row class='fluid' v-if="showUpload">
                <mdb-col>
                    <form enctype="multipart/form-data">

                        <div 
                            v-show='message'
                            :class="`message ${error ? 'is-danger' : 'is-succses'}`"
                        >
                            <div class="message-body">{{ message }}</div>
                        </div>

                        <div class="field">

                            <label for="file" calss="label">Upload file</label>
                            <input 
                                type="file"
                                ref="file"
                                @change="selectFile"
                            />

                            <span v-if="file"> {{ file.name }}</span>

                        </div>
                        {{ error }}
                    </form>
                </mdb-col>
            </mdb-row>
            
        </mdb-col>

    </mdb-row>
</mdb-container>
</template>

<style lang="scss" scoped>
    
    .gen {
        margin-top: 20px;
        font-weight: 500;
        background-color: white;
    }
    .column{
        height: 50px;      
        padding-top: 12px;
        border-bottom: 1px solid grey;  
        cursor: pointer;
    }
    .c2{
        border-left: 1px solid grey;
    }

    .dropzone{
        min-height: 300px;
        padding: 10px 10px;
        position: relative;
        cursor: pointer;
        outline: 2px dashed grey;
        outline-offset: -10px;
        background: rgb(248, 248, 248);
        color: dimgray;
    }

    .dropzone:hover {
        background: rgb(223, 223, 223);
    }
    
    .input-file{
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        cursor: pointer;
    }
    .dropzone .call-to-action {
        font-size: 1.2rem;
        text-align: center;
        padding: 60px 0;
    }
    
    .input-file{
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        cursor: pointer;
    }
    
</style>