<template>
  <UiTable class="table" v-if="cols?.length">
    <template #header>
      <UiStack
        class="table-header"
        justify-content="space-between"
        align-items="center"
      >
        <div class="table-title">{{ title }}</div>
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
      <div class="table-body">
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
                    <div class="resize-invisible"></div>

                    <template
                      v-if="!col?.can_not_sort && col.name != 'actions'"
                    >
                      <div
                        class="d-flex align-items-center"
                        style="cursor: pointer"
                        v-if="
                          filters?.sort == col.name &&
                          filters?.sort &&
                          filters?.sort[0] != '-'
                        "
                        @click="changeSort?.('-' + col.name)"
                      >
                        {{ col.title }}
                        <button>
                          <div
                            class="table-sort-btn table-sort-btn_bottom"
                          ></div>
                        </button>
                      </div>
                      <div
                        class="d-flex align-items-center"
                        style="cursor: pointer"
                        v-else-if="
                          filters?.sort?.slice?.(1) == col.name &&
                          filters?.sort &&
                          filters?.sort[0] == '-'
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
                    <div v-else>{{ col.title }}</div>
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
              <!-- <th></th> -->
              <!-- <th style="width: 1px;overflow: hidden;padding: 0;"></th> -->
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
                  <template v-else>{{
                    getValueByName(item, col.name)
                  }}</template>
                </td>
              </template>
              <!-- <td></td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #table v-else-if="loading">
      <div class="table-body">
        <table class="table__block">
          <thead>
            <tr>
              <th v-for="col in cols">
                <UiStack gap="1">
                  <div>{{ col.title }}</div>

                  <template v-if="!col?.can_not_sort && col.name != 'actions'">
                    <button
                      v-if="
                        filters?.sort == col.name &&
                        filters?.sort &&
                        filters?.sort[0] != '-'
                      "
                      @click="changeSort?.('-' + col.name)"
                    >
                      <div class="table-sort-btn table-sort-btn_bottom"></div>
                    </button>
                    <button
                      v-else-if="
                        filters?.sort?.slice?.(1) == col.name &&
                        filters?.sort &&
                        filters?.sort[0] == '-'
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
      </div>
    </template>
    <template #table v-else>
      <div class="table-body">
        <table class="table__block">
          <thead>
            <tr>
              <th v-for="col in cols">
                <UiStack gap="1">
                  <div>{{ col.title }}</div>
                  <template v-if="!col?.can_not_sort && col.name != 'actions'">
                    <button
                      v-if="
                        filters?.sort == col.name &&
                        filters?.sort &&
                        filters?.sort[0] != '-'
                      "
                      @click="changeSort?.('-' + col.name)"
                    >
                      <div class="table-sort-btn table-sort-btn_bottom"></div>
                    </button>
                    <button
                      v-else-if="
                        filters?.sort?.slice?.(1) == col.name &&
                        filters?.sort &&
                        filters?.sort[0] == '-'
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
      </div>
    </template>

    <template #footer>
      <slot name="footer">
        <div class="table-count">
          <div class="table-count__amount">
            Итого записей: {{ meta?.total ?? 0 }}
          </div>
          <BasePagination
            class="table-pagination"
            :total="meta?.total"
            :limit="meta?.per_page"
            v-if="filters"
            v-model:current-page="filters.page"
          />
          <div>
            <UiSelect
              class=""
              hideMessage
              v-if="filters"
              v-model="filters.limit"
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
          </div>
        </div>
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
  filters: [Object, String, Array],
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
  props.filters.sort = sort;
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
  padding: 0 0.625rem;
  position: absolute;
  user-select: none;
  margin-right: -10px;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 100;

  // &:hover {
  .resizer {
    background-color: rgb(var(--color-white), 0.75);
    // height: 100%;
    cursor: col-resize;
  }
  // }
}

.resize-invisible {
  background-color: rgb(239, 239, 239);
  position: absolute;
  top: -32px;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 35px;
  z-index: -100;
}

.resizer {
  background-color: rgb(var(--color-white), 0.25);
  color: white;
  pointer-events: none;
  user-select: none;
  transition: 0.3s;
  // margin-right: -10px;
  height: 100%;
  width: 4px;
}

.table {
  background-color: rgb(var(--color-white));
  border-radius: 0.33rem;

  &-title {
    font-weight: 700;
  }

  &-header {
    border-bottom: 2px solid rgb(var(--color-pre-white));
    padding: 0.75rem 1.25rem;
    margin-bottom: 1.25rem;
  }

  &-body {
    overflow-x: auto;
  }

  &-column {
    width: fit-content;
    z-index: 103;

    &-dropdown {
      background-color: rgb(var(--color-white));
      border-radius: 0.33rem;
      padding: 0 0.75rem;
      transform: translateY(1.75rem);
    }

    .control__checkbox {
      padding: 0.75rem;
    }

    &-select {
      background-color: rgb(var(--color-white));
      cursor: pointer;
    }
  }

  &__block {
    border-collapse: collapse;
    caption-side: bottom;
    text-align: left;
    overflow-y: hidden;
    width: 100%;

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
    border-top: 2px solid rgb(var(--color-pre-white));
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.75rem;
    margin-top: 1.25rem;

    &__amount {
      display: flex;
      align-items: center;
    }
  }

  &-pagination {
    padding: 0.5rem 0;
  }
}
.resizable {
  background: rgb(var(--color-blue-light));
  border-bottom: 1px solid #eee;
  color: rgb(var(--color-white));
  font-size: 0.675rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
  padding-bottom: 1rem;
  padding-top: 1rem;
  // &:not(:last-child) {
  position: relative;
  overflow: hidden;
  height: 100%;
  // }
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
