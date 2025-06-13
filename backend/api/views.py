import os
import requests
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging
from .models import CustomUser


from requests.exceptions import Timeout, RequestException  # Import missing exceptions
# Setting up logging
logger = logging.getLogger(__name__)

class TopTracksView(APIView):
    def get(self, request):
        artist_album_list = [
            {"artist": "BLACKPINK", "album": "THE ALBUM"},
            {"artist": "The Weeknd", "album": "After Hours"},
            {"artist": "Justin Bieber", "album": "Justice"},
            {"artist": "Taylor Swift", "album": "Lover"},
            {"artist": "One Direction", "album": "Made in the A.M."},
            {"artist": "The Chainsmokers", "album": "Memories...Do Not Open"},
            {"artist": "Zayn Malik", "album": "Mind of Mine"},
            {"artist": "Ariana Grande", "album": "Sweetener"},
            {"artist": "Selena Gomez", "album": "Rare"},
        ]
        
        artist_clips = {
            "BLACKPINK": request.build_absolute_uri(static("videos/blackpink.mp4")),
            "The Weeknd": request.build_absolute_uri(static("videos/weeknd.mp4")),
            "Justin Bieber": request.build_absolute_uri(static("videos/justin.mp4")),
            "Taylor Swift": request.build_absolute_uri(static("videos/taylor.mp4")),
            "One Direction": request.build_absolute_uri(static("videos/oned.mp4")),
            "The Chainsmokers": request.build_absolute_uri(static("videos/chain.mp4")),
            "Zayn Malik": request.build_absolute_uri(static("videos/zayn.mp4")),
            "Ariana Grande": request.build_absolute_uri(static("videos/ariana.mp4")),
            "Selena Gomez": request.build_absolute_uri(static("videos/selena.mp4")),
        }
        

        url = "https://ws.audioscrobbler.com/2.0/"
        results = []

        for item in artist_album_list:
            artist_name = item["artist"]
            album_name = item["album"]
            artist_clip = artist_clips.get(artist_name, "")

            params = {
                "method": "album.getinfo",
                "api_key": os.getenv("LASTFM_API_KEY"),
                "format": "json",
                "artist": artist_name,
                "album": album_name,
            }

            try:
                response = requests.get(url, params=params)
                if response.status_code == 200:
                    album_data = response.json().get("album", {})
                    if album_data:
                        album_data["clip"] = artist_clip
                        results.append(album_data)
                    else:
                        results.append({
                            "artist": artist_name,
                            "album": album_name,
                            "error": "No album data found"
                        })
                else:
                    results.append({
                        "artist": artist_name,
                        "album": album_name,
                        "error": f"Failed to fetch data: {response.status_code}"
                    })
            except Exception as e:
                logger.error(f"Error fetching data for {artist_name} - {album_name}: {str(e)}")
                results.append({
                    "artist": artist_name,
                    "album": album_name,
                    "error": str(e)
                })

        return Response(results, status=status.HTTP_200_OK)

import os
import uuid
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from django.templatetags.static import static


class TopArtistSongView(APIView):
    def get(self, request):
        artist_list = [
            {"artist": "A R Rahman"},
            {"artist": "Anirudh Ravichander"},
            {"artist": "Vidya Vox"},
            {"artist": "Arijit Singh"},
            {"artist": "Shreya Ghoshal"},
            {"artist": "Neha Kakkar"},
            {"artist": "Taylor Swift"},
            {"artist": "The Weeknd"},
            {"artist": "Billie Eilish"},
            {"artist": "Ed Sheeran"},
            {"artist": "Drake"},
            {"artist": "Adele"}
        ]
        
        artist_images = {
            "A R Rahman": request.build_absolute_uri(static("images/rahman.png")),
            "Anirudh Ravichander": request.build_absolute_uri(static("images/aniruth.png")),
            "Vidya Vox": request.build_absolute_uri(static("images/vox.png")),
            "Arijit Singh": request.build_absolute_uri(static("images/arjitsingh.png")),
            "Shreya Ghoshal": request.build_absolute_uri(static("images/shreya.png")),
            "Neha Kakkar": request.build_absolute_uri(static("images/neha.png")),
            "Taylor Swift": request.build_absolute_uri(static("images/taylor.png")),
            "The Weeknd": request.build_absolute_uri(static("images/weeknd.png")),
            "Billie Eilish": request.build_absolute_uri(static("images/billie.png")),
            "Ed Sheeran": request.build_absolute_uri(static("images/edsheeran.png")),
            "Drake": request.build_absolute_uri(static("images/drake.png")),
            "Adele": request.build_absolute_uri(static("images/adele.png")),
        }


        url = "https://ws.audioscrobbler.com/2.0/"
        grouped_data = []

        for item in artist_list:
            artist_name = item["artist"]
            artist_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, artist_name))  # consistent ID per artist

            params = {
                "method": "artist.getTopTracks",
                "api_key": os.getenv("LASTFM_API_KEY"),
                "format": "json",
                "artist": artist_name
            }

            try:
                response = requests.get(url, params=params)
                if response.status_code == 200:
                    artist_data = response.json()
                    if "toptracks" in artist_data and "track" in artist_data["toptracks"]:
                        tracks = artist_data["toptracks"]["track"]
                        if not isinstance(tracks, list):
                            tracks = [tracks]

                        track_list = []

                        for track in tracks:
                            track_list.append({
                                "track_name": track.get("name"),
                                "listeners": track.get("listeners"),
                                "playcount": track.get("playcount"),
                                "url": track.get("url"),
                                "rank": track.get("@attr", {}).get("rank"),
                            })
                        artist_image = artist_images.get(artist_name, "")
                        grouped_data.append({
                            "artist": artist_name,
                            "artist_id": artist_id,
                            "image": artist_image,
                            "tracks": track_list
                        })

            except Exception as e:
                print(f"Error fetching tracks for {artist_name}: {e}")

        return Response(grouped_data, status=200)

from rest_framework.decorators import api_view
from .models import CustomUser 
from django.contrib.auth.hashers import make_password
from django.db import models


@api_view(['POST'])
def signup_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    CustomUser.objects.create(email=email, password=make_password(password))
    return Response({"success": "User created successfully"}, status=status.HTTP_201_CREATED)

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Authenticate user
    user = authenticate(email=email, password=password)

    if user is not None:
        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
        })
    else:
        return Response({'detail': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)