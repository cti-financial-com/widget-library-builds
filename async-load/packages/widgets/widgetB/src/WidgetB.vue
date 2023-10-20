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
  name: 'widgetB',
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
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Widget B</v-card-title>
          <v-card-text>
            <p>Widget B content</p>
            <p>I18n: {{ $t('widget-b') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
