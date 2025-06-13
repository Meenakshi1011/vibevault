from django.urls import path
from .views import TopTracksView, TopArtistSongView, signup_view ,login # Import views correctly

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("top-tracks/", TopTracksView.as_view()),
    path("top-artist-songs/", TopArtistSongView.as_view()),
    path('signup/', signup_view, name='signup'),  
    path('login/', login, name='login'),
    
    # Use the correct view here
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
