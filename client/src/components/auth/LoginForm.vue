<script>
import { mdbInput, mdbBtn, mdbRow, mdbCol, mdbContainer } from 'mdbvue';
  export default {
    name: 'Log',
    components: {
      mdbInput,
      mdbBtn,
      mdbRow,
      mdbCol,
      mdbContainer
    }
}

</script>

<template>
<mdb-container>
        <mdb-row class="justify-content-md-center">
            <mdb-col col='6'>
                <form>
                    <p class="h4 text-center mb-4">Sign in</p>
                    <div class="grey-text">
                    <mdb-input label="Your email" icon="envelope" type="email"/>
                    <mdb-input label="Your password" icon="lock" type="password"/>
                    </div>
                    <div class="text-center">
                    <mdb-btn>Login</mdb-btn>
                    </div>
                </form>
            </mdb-col>
        </mdb-row>
</mdb-container>
</template>