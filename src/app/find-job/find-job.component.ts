import { Component } from '@angular/core';
import { FindJobService } from './service/find-job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { GetCities, GetVehicle, SelectFirstVehicle } from './find-job.action';
import { City } from './find-job.model';


@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.scss']
})
export class FindJobComponent {

  findJobForm: FormGroup;
  citiesArray = [];
  vehiclesInfo = [];

  availableVehicles = [];
  availableVehicleForDestinationOne = [];
  availableVehicleForDestinationTwo = [];
  availableVehicleForDestinationThree = [];
  availableVehicleForDestinationFour = [];


  timeSpentOnTravel;

  selectedCities = {
    firstSelectedCity: '',
    secondSelectedCity: '',
    thirdSelectedCity: '',
    fourthSelectedCity: ''
  };

  selectedVehicles = [];

  firstDestinationCities = [];
  secondDestinationCities = [];
  thirdDestinationCities = [];
  fourthDestinationCities = [];

  findJobState$: Observable<City[]>;
  constructor(
    private service: FindJobService,
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.findJobState$ = this.store.pipe(select('reducer'));
    this.store.dispatch(new GetCities());
    this.store.dispatch(new GetVehicle());

    this.createForm();
    // this.listenFormChange();
    // this.getCities();
    // this.getVehicle();
  }

  createForm = () => {
    this.findJobForm = this.fb.group({
      firstSelectedDesination: [''],
      secondSelectedDesination: [''],
      thirdSelectedDesination: [''],
      fourthSelectedDesination: [''],
      firstDestinationVehicle: [''],
      secondDestinationVehicle: [''],
      thirdDestinationVehicle: [''],
      fourthDestinationVehicle: ['']
    });
  }

  listenFormChange = () => {

    this.findJobForm.get('firstSelectedDesination').valueChanges.subscribe((data) => {

      this.availableVehicleForDestinationOne = Object.create(this.availableVehicles);

      this.availableVehicleForDestinationOne.forEach((item) => {
        if (data['distance'] > item['max_distance'] * item['total_no']) {
          item['isDisabled'] = true;
        } else {
          item['isDisabled'] = false;
        }
      });

    });

    this.findJobForm.get('firstDestinationVehicle').valueChanges.subscribe((data) => {
      this.findJobForm.get('secondSelectedDesination').enable();

      this.availableVehicleForDestinationOne = Object.create(this.availableVehicles);

      const distanceNeedToCover = this.findJobForm.get('firstSelectedDesination').value['distance'];
      const total_num_vehicle = data['total_no'];
      const vehicel_max_distance = data['max_distance'];

      const tempArray = [];
      this.availableVehicles.forEach((item) => {
        const tempObj = Object.create(item);
        if (tempObj['name'] === data['name']) {

          if (distanceNeedToCover > vehicel_max_distance * total_num_vehicle
            || distanceNeedToCover === vehicel_max_distance * total_num_vehicle) {
            tempObj['total_no'] = 0;
          } else if (distanceNeedToCover <= vehicel_max_distance * total_num_vehicle) {
            tempObj['total_no'] = tempObj['total_no'] - 1;
          }

          if (tempObj['total_no'] === 0) {
            tempObj['isDisabled'] = true;
          }

        }
        tempArray.push(tempObj);
      });

      this.availableVehicleForDestinationTwo = tempArray;

    });

    this.findJobForm.get('secondSelectedDesination').valueChanges.subscribe((data) => {
      this.availableVehicleForDestinationTwo.forEach((item) => {
        if (data['distance'] > item['max_distance'] * item['total_no']) {
          item['isDisabled'] = true;
        } else {
          item['isDisabled'] = false;
        }
      });

    });

    this.findJobForm.get('secondDestinationVehicle').valueChanges.subscribe((data) => {
      this.findJobForm.get('thirdSelectedDesination').enable();
    });

    this.findJobForm.get('thirdDestinationVehicle').valueChanges.subscribe((data) => {
      this.findJobForm.get('fourthSelectedDesination').enable();
    });

  }

  getCities = () => {
    this.service.getCities().subscribe(
      (success) => {
        this.citiesArray = Object.create(success);
        this.firstDestinationCities = Object.create(success);
        this.secondDestinationCities = Object.create(success);
        this.thirdDestinationCities = Object.create(success);
        this.fourthDestinationCities = Object.create(success);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getVehicle = () => {
    this.service.getvehicles().subscribe(
      (success) => {
        // console.log(success);
        this.vehiclesInfo = Object.create(success);
        this.availableVehicles = Object.create(success);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectVehicle = (vehicle, destination) => {
    // this.selectedVehicles.push(data);
    this.store.dispatch(new SelectFirstVehicle(vehicle, destination));
  }

  getFilteredDestination = (mainArray = [], senderName = '') => {
    const tempArray = [];
    for (let index = 0; index < mainArray.length; index++) {
      let flag = 0;
      for (const key in this.selectedCities) {
        if (this.selectedCities[key] === mainArray[index]['name']) {
          if (senderName !== key) {
            flag = 1;
          }
        }
      }
      if (!flag) {
        tempArray.push(mainArray[index]);
      }
    }
    return tempArray;
  }

  selectCity = (item, name) => {
    this.selectedCities[name] = item;
    if (name === 'firstSelectedCity') {
      // this.store.dispatch(new SelectFirstDestination(item));

      console.log(this.findJobState$['actionsObserver'].value.payload);

      this.secondDestinationCities = this.getFilteredDestination(this.citiesArray, 'secondSelectedCity');
      this.thirdDestinationCities = this.getFilteredDestination(this.citiesArray, 'thirdSelectedCity');
      this.fourthDestinationCities = this.getFilteredDestination(this.citiesArray, 'fourthSelectedCity');
    }

    if (name === 'secondSelectedCity') {
      this.firstDestinationCities = this.getFilteredDestination(this.citiesArray, 'firstSelectedCity');
      this.thirdDestinationCities = this.getFilteredDestination(this.citiesArray, 'thirdSelectedCity');
      this.fourthDestinationCities = this.getFilteredDestination(this.citiesArray, 'fourthSelectedCity');
    }

    if (name === 'thirdSelectedCity') {
      this.firstDestinationCities = this.getFilteredDestination(this.citiesArray, 'firstSelectedCity');
      this.secondDestinationCities = this.getFilteredDestination(this.citiesArray, 'secondSelectedCity');
      this.fourthDestinationCities = this.getFilteredDestination(this.citiesArray, 'fourthSelectedCity');
    }

    if (name === 'fourthSelectedCity') {
      this.firstDestinationCities = this.getFilteredDestination(this.citiesArray, 'firstSelectedCity');
      this.secondDestinationCities = this.getFilteredDestination(this.citiesArray, 'secondSelectedCity');
      this.thirdDestinationCities = this.getFilteredDestination(this.citiesArray, 'thirdSelectedCity');
    }

  }

  calCulateTime = () => {

    const firstDis = this.findJobForm.get('firstSelectedDesination').value;
    const secondDis = this.findJobForm.get('secondSelectedDesination').value;
    const thirdDis = this.findJobForm.get('thirdSelectedDesination').value;
    const fourthDis = this.findJobForm.get('fourthSelectedDesination').value;

    const firstDisTime = this.findJobForm.get('firstDestinationVehicle').value;
    const secondDisTime = this.findJobForm.get('secondDestinationVehicle').value;
    const thirdDisTime = this.findJobForm.get('thirdDestinationVehicle').value;
    const fourthDisTime = this.findJobForm.get('fourthDestinationVehicle').value;

    const timeForFirstDes = firstDis['distance'] / firstDisTime['speed'];
    const timeForSecondDes = secondDis['distance'] / secondDisTime['speed'];
    const timeForThirdDes = thirdDis['distance'] / thirdDisTime['speed'];
    const timeForFourthDes = fourthDis['distance'] / fourthDisTime['speed'];

    const totalTime = timeForFirstDes + timeForSecondDes + timeForThirdDes + timeForFourthDes;

    this.timeSpentOnTravel = totalTime;

  }

  submitForm = () => {

    this.calCulateTime();

    // api is not working;
    this.service.getToken().subscribe(
      (success) => {

        const param = {
          token: success,
          city_names: this.selectedCities,
          transportvehicle_name: this.selectedVehicles
        };
        // api is not working
        this.service.findJob(param).subscribe(
          (pass) => {
            alert(pass);
          },
          (error) => {
            console.log(error);
          }
        );

      },
      (error) => {
        console.log(error);
      }
    );

  }

}
