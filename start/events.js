const Event = use('Event')


//bind new user registered event
Event.on('new::user', 'User.registered')
