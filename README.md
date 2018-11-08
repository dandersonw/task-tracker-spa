# TaskTracker

Design choices:
* How to handle validating assignee names: I did this using a virtual field and
  a validation step in `user.ex`. This was much nicer than my clunky handling in
  `users.ex` from the previous tracker.
* Error handling/redirects based on async call results: The callbacks given to
  AJAX calls would set an appropriate state value via Redux. The appropriate
  components would pick up on that value and redirect/display appropriately. The
  error handling could have been done more nicely, but I ran out of time to
  implement such QoL features.
