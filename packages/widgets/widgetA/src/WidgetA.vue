<script>
import {
  VContainer,
  VRow,
  VCol,
  VCard,
  VCardTitle,
  VCardText,
} from '@dory/fe-components';

export default {
  name: 'widgetA',
  components: {
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardTitle,
    VCardText,
  },
};
</script>

<template>
  <!-- <div>
    <h2>Widget A</h2>
    <div>
      <p>Widget A content</p>
      <p>I18n: {{ $t('widget-a') }}</p>
    </div>
  </div> -->
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Widget A</v-card-title>
          <v-card-text>
            <p>Widget A content</p>
            <p>I18n: {{ $t('widget-a') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
