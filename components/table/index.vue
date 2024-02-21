<template>
  <UiTable v-if="cols?.length" style="margin-bottom: 150px">
    <template #header>
      <UiStack justify-content="space-between" align-items="center">
        {{ title }}
        <UiStack gap="4" align-items="center">
          <UiDropdownMenu class="table-column" :is-show="false">
            <template #drop>
              <!-- rgb(var(--white-color)) -->
              <UiStack
                class="table-column-dropdown"
                flex-direction="column"
                justify-content="space-between"
              >
                <div
                  v-for="col in cols
                    .filter((a) => a.name != 'actions')
                    .sort((a, b) => a.order - b.order)"
                >
                  <UiCheckbox
                    style="padding: 0"
                    :model-value="!col.is_hidden"
                    :label="col.title"
                    @update:model-value="col.is_hidden = !col.is_hidden"
                  />
                </div>
              </UiStack>
            </template>
            <template #body>
              <div class="table-column-select">Выбрать колонки</div>
            </template>
          </UiDropdownMenu>
        </UiStack>
      </UiStack>
    </template>
    <template #table v-if="!loading && data?.length">
      <table class="table__block">
        <thead>
          <tr>
            <template
              v-for="col in cols.sort((a, b) => a.order - b.order)"
              :key="col.id"
              :id="col.field"
            >
              <th
                v-if="!col.is_hidden"
                :style="[
                  {
                    minWidth: `${col.width ? col.width + 'px' : 'auto'}`,
                  },
                  {
                    width: `${col.width ? col.width + 'px' : 'auto'}`,
                  },
                ]"
                class="resizable"
              >
                <UiStack gap="1">
                  <div
                    style="
                      position: absolute;
                      top: -32px;
                      left: 0;
                      right: 0;
                      z-index: -100;
                      margin: 0 auto;
                      height: 35px;
                      background-color: rgb(239, 239, 239);
                    "
                  />

                  <template v-if="!col?.can_not_sort && col.name != 'actions'">
                    <div
                      class="d-flex align-items-center"
                      style="cursor: pointer"
                      v-if="
                        filterForm?.sort == col.name &&
                        filterForm?.sort &&
                        filterForm?.sort[0] != '-'
                      "
                      @click="changeSort?.('-' + col.name)"
                    >
                      {{ col.title }}
                      <button>
                        <div class="table-sort-btn table-sort-btn_bottom"></div>
                      </button>
                    </div>
                    <div
                      class="d-flex align-items-center"
                      style="cursor: pointer"
                      v-else-if="
                        filterForm?.sort?.slice?.(1) == col.name &&
                        filterForm?.sort &&
                        filterForm?.sort[0] == '-'
                      "
                      @click="changeSort?.('')"
                    >
                      {{ col.title }}
                      <button>
                        <div class="table-sort-btn table-sort-btn_top"></div>
                      </button>
                    </div>
                    <div
                      class="d-flex align-items-center"
                      style="cursor: pointer"
                      v-else
                      @click="changeSort?.(col.name)"
                    >
                      {{ col.title }}
                      <button>
                        <div class="table-sort-btn"></div>
                      </button>
                    </div>
                  </template>
                  <div v-else>{{ col.title }} 1</div>
                  <!-- <button style="position: absolute;top: -32px;right: 0; font-size: 25px;"
                                        @click="changeOrder(col.id, +1)">
                                        &#8594;
                                    </button> -->
                  <div
                    class="reziser-wrapper"
                    v-if="col?.resizable"
                    @mousedown="mouseDownHandler($event, col)"
                    @dblclick="mouseDownAuto($event, col)"
                  >
                    <div class="resizer"></div>
                  </div>
                </UiStack>
              </th>
            </template>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in data" :key="item.id">
            <template v-for="col in cols" :key="col.name">
              <td v-if="!col.is_hidden">
                <component
                  v-if="col.renderComponent"
                  :is="col?.renderComponent?.(item)"
                  :id="item.id"
                />
                <template v-else-if="col?.convertTo">{{
                  col.convertTo(getValueByName(item, col.name))
                }}</template>
                <template v-else>{{ getValueByName(item, col.name) }}</template>
              </td>
            </template>
            <td></td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #table v-else-if="loading">
      <table class="table__block">
        <thead>
          <tr>
            <th v-for="col in cols">
              <UiStack gap="1">
                <div>{{ col.title }}</div>

                <template
                  v-if="
                    col.name.split('.').length <= 1 &&
                    !col?.can_not_sort &&
                    col.name != 'actions'
                  "
                >
                  <button
                    v-if="
                      filterForm?.sort == col.name &&
                      filterForm?.sort &&
                      filterForm?.sort[0] != '-'
                    "
                    @click="changeSort?.('-' + col.name)"
                  >
                    <div class="table-sort-btn table-sort-btn_bottom"></div>
                  </button>
                  <button
                    v-else-if="
                      filterForm?.sort?.slice?.(1) == col.name &&
                      filterForm?.sort &&
                      filterForm?.sort[0] == '-'
                    "
                    @click="changeSort?.('')"
                  >
                    <div class="table-sort-btn table-sort-btn_top"></div>
                  </button>
                </template>
                <div
                  class="reziser-wrapper"
                  @mousedown="mouseDownHandler($event, col)"
                  @dblclick="mouseDownAuto($event, col)"
                >
                  <div v-if="col?.resizable" class="resizer"></div>
                </div>
              </UiStack>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td v-for="col in cols" :key="col.name">
              <component v-if="col.template" :is="col.template" />
            </td>
          </tr>
        </tbody>
      </table>
      <UiLoader />
    </template>
    <template #table v-else>
      <table class="table__block">
        <thead>
          <tr>
            <th v-for="col in cols">
              <UiStack gap="1">
                <div>{{ col.title }}</div>
                <template
                  v-if="
                    col.name.split('.').length <= 1 &&
                    !col?.can_not_sort &&
                    col.name != 'actions'
                  "
                >
                  <button
                    v-if="
                      filterForm?.sort == col.name &&
                      filterForm?.sort &&
                      filterForm?.sort[0] != '-'
                    "
                    @click="changeSort?.('-' + col.name)"
                  >
                    <div class="table-sort-btn table-sort-btn_bottom"></div>
                  </button>
                  <button
                    v-else-if="
                      filterForm?.sort?.slice?.(1) == col.name &&
                      filterForm?.sort &&
                      filterForm?.sort[0] == '-'
                    "
                    @click="changeSort?.('')"
                  >
                    <div class="table-sort-btn table-sort-btn_top"></div>
                  </button>
                  <button v-else @click="changeSort?.(col.name)">
                    <div class="table-sort-btn"></div>
                  </button>
                </template>
                <div
                  class="reziser-wrapper"
                  @mousedown="mouseDownHandler($event, col)"
                  @dblclick="mouseDownAuto($event, col)"
                >
                  <div v-if="col?.resizable" class="resizer"></div>
                </div>
              </UiStack>
            </th>
          </tr>
        </thead>
      </table>
      <UiStack align-items="center" padding="2" margin-x="5">
        <UiTypography font-size="3" font-weight="medium">
          Ничего не найдено
        </UiTypography>
      </UiStack>
    </template>

    <template #footer>
      <slot name="footer">
        <UiRow class="table-count" justify-content="space-between">
          <div class="table-count__amount">
            Итого записей: {{ meta?.total ?? 0 }}
          </div>
          <BasePagination
            :total="meta?.total"
            :limit="meta?.per_page"
            v-if="filterForm"
            v-model:current-page="filterForm.page"
          />
          <UiSelect
            class=""
            hideMessage
            v-if="filterForm"
            v-model="filterForm.limit"
            model-value-is-number
            :options="[
              {
                id: 20,
                value: 20,
              },
              {
                id: 50,
                value: 50,
              },
              {
                id: 100,
                value: 100,
              },
            ]"
          />
        </UiRow>
      </slot>
    </template>
  </UiTable>
</template>

<script setup>
const emits = defineEmits(["update:activeId"]);

const props = defineProps({
  loading: Boolean,
  title: String,
  data: Object,
  cols: Array,
  meta: Object,
  filterForm: [Object, String, Array],
});

watch(
  () => props.cols,
  () => {
    restore(props.cols);
  }
);

const { cols, restore, mouseDownHandler, mouseDownAuto } = useDynamicTh(
  props.cols,
  {
    resizeCallback: async (colId, val) => {
      // try {
      //     console.log(colId, val);
      //     // props.debounceUpdateCol(colId, val)
      // } catch (error) {
      //     console.error(error);
      // }
    },
  }
);

const changeSort = (sort) => {
  props.filterForm.sort = sort;
};

const getValueByName = (item, name) => {
  if (!item || !name) {
    return null;
  }

  const splittedName = name.match(/[^\]|.|\[]+/gm) || [];

  let finalData = item;

  for (let i = 0; i < splittedName.length; i++) {
    try {
      if (!finalData[splittedName[i]]) {
        return null;
      }
      finalData = finalData[splittedName[i]];
    } catch (error) {
      return null;
    }
  }

  return finalData;
};
</script>

<style lang="scss" scoped>
.reziser-wrapper {
  cursor: col-resize;
  padding: 0 10px;
  position: absolute;
  margin-right: -10px;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 100;

  &:hover {
    .resizer {
      background: rgba(49, 81, 183, 0.216);
      // height: 100%;
      cursor: col-resize;
    }
  }
}

.resizer {
  background: rgba(49, 80, 183, 0.03);
  color: white;
  user-select: none;
  // margin-right: -10px;
  height: 100%;
  width: 3px;
}

.table {
  &-column {
    z-index: 103;

    &-dropdown {
      background-color: rgb(var(--color-white));
      border-radius: 0.33rem;
      padding: 0 0.75rem;
      transform: translateY(0.75rem);
    }

    .control__checkbox {
      padding: 0.75rem;
    }

    &-select {
      background-color: rgb(var(--color-white));
      border-radius: 0.33rem;
      padding: 0.75rem 1.25rem;
      margin-bottom: 0.75rem;
    }
  }

  &__block {
    border-collapse: collapse;
    border-radius: 0.33rem;
    overflow: hidden;
    caption-side: bottom;
    text-align: left;

    tr {
      background-color: rgb(var(--color-white));
    }

    th,
    td {
      padding: 0.8rem 1.5rem;
    }

    td {
      text-wrap: pretty;
      word-wrap: break-word;
      background-color: transparent;
      border-bottom: 1px solid rgb(var(--color-pre-white));
      font-size: 0.8125rem;
    }
  }

  &-count {
    &__amount {
      background-color: rgb(var(--color-white));
      border-radius: 0.33rem;
      display: flex;
      align-items: center;
      padding: 0.75rem 1.25rem;
    }
  }
}
.resizable {
  background: #f5f9fc;
  border-bottom: 1px solid #eee;
  font-size: 0.675rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  padding-bottom: 1rem;
  padding-top: 1rem;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;

  &:not(:last-child) {
    position: relative;
    height: 100%;

    // width: 200px;
    // min-width: 200px;
  }
}

.table-sort-btn {
  background-image: url("assets/img/table-sort.svg");
  background-repeat: no-repeat;
  background-position: right center;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: -16px -20px;
  padding: 20px;
  padding-right: 12px;
  height: 12px;
  width: 15px;

  &_bottom {
    height: 12px;
    background-image: url("assets/img/table-sort-bottom.svg");
  }

  &_top {
    width: 15px;
    background-image: url("assets/img/table-sort-top.svg");
  }

  &__text {
    font-size: 0.65rem;
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
  }
}
</style>
