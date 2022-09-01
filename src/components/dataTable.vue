<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
       style="height: 470px;">
    <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
      <thead>
      <tr class="text-left">
        <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
          <label
            class="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
            <input type="checkbox" class="form-checkbox focus:outline-none focus:shadow-outline" @click="selectAllCheckbox($event);">
          </label>
        </th>
        <template x-for="heading in headings">
          <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
              x-text="heading.value" :x-ref="heading.key" :class="{ [heading.key]: true }"></th>
        </template>
      </tr>
      </thead>
      <tbody>
      <template x-for="user in users" :key="user.userId">
        <tr>
          <td class="border-dashed border-t border-gray-200 px-3">
            <label
              class="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
              <input type="checkbox" class="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" :name="user.userId"
                     @click="getRowDetail($event, user.userId)">
            </label>
          </td>
          <td class="border-dashed border-t border-gray-200 userId">
            <span class="text-gray-700 px-6 py-3 flex items-center" x-text="user.userId"></span>
          </td>
          <td class="border-dashed border-t border-gray-200 firstName">
            <span class="text-gray-700 px-6 py-3 flex items-center" x-text="user.firstName"></span>
          </td>
          <td class="border-dashed border-t border-gray-200 lastName">
            <span class="text-gray-700 px-6 py-3 flex items-center" x-text="user.lastName"></span>
          </td>
          <td class="border-dashed border-t border-gray-200 emailAddress">
								<span class="text-gray-700 px-6 py-3 flex items-center"
                      x-text="user.emailAddress"></span>
          </td>
          <td class="border-dashed border-t border-gray-200 gender">
								<span class="text-gray-700 px-6 py-3 flex items-center"
                      x-text="user.gender"></span>
          </td>
          <td class="border-dashed border-t border-gray-200 phoneNumber">
								<span class="text-gray-700 px-6 py-3 flex items-center"
                      x-text="user.phoneNumber"></span>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "dataTable"
}
</script>

<style scoped>

</style>
