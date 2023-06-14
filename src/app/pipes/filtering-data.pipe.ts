import { Pipe, PipeTransform } from '@angular/core';
import { userInterface } from '../userInterface';
import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'filteringData',
})
export class FilteringDataPipe implements PipeTransform {
  filterUsers: userInterface[] = [];

  transform(
    users: userInterface[],
    searchVal: FormGroup,
    max: number
  ): userInterface[] {
    if (max == undefined || max == 100) {
      max = 99;
    }

    if (!users || !searchVal || !max) {
      return users;
    }
    this.filterUsers = users.filter((userData) => {
      console.log(
        //   formatDate(searchVal.get('birthDate')?.value, 'yyyy-MM-dd', 'en-US')
        // max
        'At pipe' + searchVal.get('age')?.value + '  &&   ' + max
      );

      if (
        userData.id
          .toString()
          .toLowerCase()
          .includes(searchVal.get('id')?.value.toLowerCase()) &&
        userData.firstName
          .toLowerCase()
          .includes(searchVal.get('firstName')?.value.toLowerCase()) &&
        userData.lastName
          .toLowerCase()
          .includes(searchVal.get('lastName')?.value.toLowerCase()) &&
        userData.maidenName
          .toLowerCase()
          .includes(searchVal.get('maidenName')?.value.toLowerCase()) &&
        userData.age.toString().toLowerCase() >=
          //.includes()
          searchVal.get('age')?.value.toString() &&
        userData.age.toString().toLowerCase() <= max.toString() && //   .toString()   .toLowerCase()
        (searchVal.get('gender')?.value.toLowerCase() == '' //default
          ? true
          : userData.gender.toLowerCase() ==
            // .includes
            searchVal.get('gender')?.value.toLowerCase()) &&
        userData.email
          .toLowerCase()
          .includes(searchVal.get('email')?.value.toLowerCase()) &&
        userData.phone
          .toLowerCase()
          .includes(searchVal.get('phone')?.value.toLowerCase()) &&
        userData.username
          .toLowerCase() //.toLowerCase()
          .includes(searchVal.get('username')?.value) &&
        userData.password
          .toLowerCase()
          .includes(searchVal.get('password')?.value.toLowerCase()) &&
        (searchVal.get('birthDate')?.value == null ||
        searchVal.get('birthDate')?.value == ''
          ? true
          : userData.birthDate
              .toLowerCase()
              .includes(
                formatDate(
                  searchVal.get('birthDate')?.value,
                  'yyyy-MM-dd',
                  'en-US'
                )
                  .toString()
                  .toLowerCase()
              )) && //.toLowerCase()
        userData.bloodGroup
          .toLowerCase()
          .includes(searchVal.get('bloodGroup')?.value.toLowerCase()) &&
        userData.height
          .toString()
          .toLowerCase()
          .includes(searchVal.get('height')?.value.toLowerCase()) &&
        userData.weight
          .toString()
          .toLowerCase()
          .includes(searchVal.get('weight')?.value.toLowerCase())
      ) {
        return userData;
      }

      return;
    });

    return this.filterUsers;
  }
}
