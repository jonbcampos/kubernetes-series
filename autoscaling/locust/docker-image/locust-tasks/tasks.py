#!/usr/bin/env python

# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


import uuid

from datetime import datetime
from locust import HttpLocust, TaskSet, task


class TaskSet(TaskSet):
    _deviceid = None

    def on_start(self):
        self._deviceid = str(uuid.uuid4())

    @task(1)
    def index(self):
        self.client.get('/')

    @task(1)
    def api(self):
        self.client.get('/api')

    @task(1)
    def healthcheck(self):
        self.client.get("/healthcheck")

    @task(1)
    def readiness(self):
        self.client.get("/readiness")

    @task(1)
    def version(self):
        self.client.get("/version")


class LocustRunner(HttpLocust):
    task_set = TaskSet
    min_wait = 5000
    max_wait = 15000